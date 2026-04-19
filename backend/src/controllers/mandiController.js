const MandiAnalysis = require('../models/MandiAnalysis');

const CACHE_TTL_MS = 5 * 60 * 1000;
const mandiCache = new Map();

const DATA_GOV_DEFAULT_API_KEY = '579b464db66ec23bdd000001000f97b4ed854b4252afb28a6b06686a';
const DATA_GOV_DEFAULT_RESOURCE_ID = '35985678-0d79-46b4-9ed6-6f13308a1d24';

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function toNumber(value) {
  const parsed = Number(String(value || '').replace(/,/g, '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function getField(record, keys) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== '') {
      return record[key];
    }
  }

  return '';
}

async function fetchJsonWithRetry(url, retries = 2) {
  let lastStatus = null;
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return { ok: true, payload: await response.json() };
      }

      lastStatus = response.status;
    } catch (error) {
      lastError = error;
    }
  }

  return {
    ok: false,
    status: lastStatus,
    error: lastError,
  };
}

function toTimestamp(dateStr) {
  const value = String(dateStr || '').trim();
  const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) {
    return 0;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const timestamp = Date.UTC(year, month - 1, day);

  return Number.isFinite(timestamp) ? timestamp : 0;
}

const mandiData = {
  Nashik: {
    Tomato: { price: 1750, distance: 0 },
    Onion: { price: 2100, distance: 0 },
    Wheat: { price: 2400, distance: 0 },
    Soybean: { price: 3900, distance: 0 },
  },
  Pune: {
    Tomato: { price: 1850, distance: 45 },
    Onion: { price: 2250, distance: 45 },
    Wheat: { price: 2480, distance: 45 },
    Soybean: { price: 4020, distance: 45 },
  },
  Mumbai: {
    Tomato: { price: 2020, distance: 110 },
    Onion: { price: 2320, distance: 110 },
    Wheat: { price: 2550, distance: 110 },
    Soybean: { price: 4180, distance: 110 },
  },
  Nagpur: {
    Tomato: { price: 1880, distance: 160 },
    Onion: { price: 2210, distance: 160 },
    Wheat: { price: 2620, distance: 160 },
    Soybean: { price: 4300, distance: 160 },
  },
};

const cropTrendFactor = {
  Tomato: 1.06,
  Onion: 1.04,
  Wheat: 1.03,
  Soybean: 1.05,
};

const analyzeMandi = async (req, res) => {
  try {
    const { crop, currentMandi, quantity, transportCostPerKm } = req.body;

    if (!crop || !currentMandi || !quantity || transportCostPerKm === undefined) {
      return res.status(400).json({ message: 'All fields are required for analysis' });
    }

    const normalizedQuantity = Number(quantity);
    const normalizedTransportCostPerKm = Number(transportCostPerKm);

    if (Number.isNaN(normalizedQuantity) || Number.isNaN(normalizedTransportCostPerKm)) {
      return res.status(400).json({ message: 'Quantity and transport cost must be numeric' });
    }

    const marketNames = Object.keys(mandiData);
    const comparison = marketNames
      .filter((market) => mandiData[market][crop])
      .map((market) => {
        const mandiEntry = mandiData[market][crop];
        const transportCost = mandiEntry.distance * normalizedTransportCostPerKm;
        const grossRevenue = mandiEntry.price * normalizedQuantity;
        const netProfit = grossRevenue - transportCost;

        return {
          mandi: market,
          price: mandiEntry.price,
          distance: mandiEntry.distance,
          transportCost: Number(transportCost.toFixed(2)),
          netProfit: Number(netProfit.toFixed(2)),
        };
      })
      .sort((a, b) => b.netProfit - a.netProfit);

    if (!comparison.length) {
      return res.status(400).json({ message: 'No mandi data available for selected crop' });
    }

    const currentPriceEntry = mandiData[currentMandi]?.[crop];
    const currentMandiPrice = currentPriceEntry ? currentPriceEntry.price : comparison[0].price;

    const predictedPrice = Number((currentMandiPrice * (cropTrendFactor[crop] || 1.03)).toFixed(2));

    const bestMandi = comparison[0];

    const analysis = await MandiAnalysis.create({
      userId: req.user.id,
      crop,
      currentMandi,
      quantity: normalizedQuantity,
      transportCost: bestMandi.transportCost,
      recommendedMandi: bestMandi.mandi,
      profit: bestMandi.netProfit,
    });

    return res.status(200).json({
      currentMandiPrice,
      predictedPrice,
      recommendedMandi: bestMandi.mandi,
      distance: bestMandi.distance,
      transportCost: bestMandi.transportCost,
      expectedProfit: bestMandi.netProfit,
      comparison,
      analysisId: analysis._id,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Analysis failed', error: error.message });
  }
};

const getAnalysisHistory = async (req, res) => {
  try {
    const history = await MandiAnalysis.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch history', error: error.message });
  }
};

const getSmartMandiFinderData = async (req, res) => {
  const commodity = (req.query.commodity || '').trim();
  const state = (req.query.state || 'Maharashtra').trim();

  if (!commodity) {
    return res.status(400).json({
      success: false,
      message: 'Commodity is required.',
    });
  }

  const cacheKey = `${normalizeText(commodity)}|${normalizeText(state)}`;
  const cacheEntry = mandiCache.get(cacheKey);

  if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TTL_MS) {
    return res.status(200).json({
      ...cacheEntry.data,
      cached: true,
    });
  }

  const apiKey = process.env.DATA_GOV_API_KEY || DATA_GOV_DEFAULT_API_KEY;
  const resourceId = process.env.DATA_GOV_RESOURCE_ID || DATA_GOV_DEFAULT_RESOURCE_ID;

  if (apiKey === 'YOUR_API_KEY' || resourceId === 'RESOURCE_ID') {
    return res.status(500).json({
      success: false,
      message: 'Server is not configured. Add DATA_GOV_API_KEY and DATA_GOV_RESOURCE_ID.',
    });
  }

  try {
    const limit = 1000;
    const maxPages = 5;
    const records = [];

    for (let page = 0; page < maxPages; page += 1) {
      const query = new URLSearchParams({
        'api-key': apiKey,
        format: 'json',
        limit: String(limit),
        offset: String(page * limit),
        'filters[state]': state,
        'filters[commodity]': commodity,
      });

      const endpoint = `https://api.data.gov.in/resource/${resourceId}?${query.toString()}`;
      const upstream = await fetchJsonWithRetry(endpoint, 2);

      if (!upstream.ok) {
        if (cacheEntry) {
          return res.status(200).json({
            ...cacheEntry.data,
            cached: true,
            warning: 'Showing last successful data due to upstream timeout.',
          });
        }

        return res.status(502).json({
          success: false,
          message: `Upstream API failed with status ${upstream.status || 504}.`,
          error: upstream.error ? upstream.error.message : undefined,
        });
      }

      const payload = upstream.payload;
      const pageRecords = Array.isArray(payload.records) ? payload.records : [];
      records.push(...pageRecords);

      if (pageRecords.length < limit) {
        break;
      }
    }

    const commodityNorm = normalizeText(commodity);
    const stateNorm = normalizeText(state);

    const filtered = records
      .filter((record) => {
        const recordCommodity = normalizeText(getField(record, ['commodity', 'Commodity']));
        const recordState = normalizeText(getField(record, ['state', 'State']));

        return recordCommodity.includes(commodityNorm) && recordState === stateNorm;
      })
      .map((record) => {
        const minPrice = toNumber(getField(record, ['min_price', 'Min_Price']));
        const maxPrice = toNumber(getField(record, ['max_price', 'Max_Price']));
        const modalPrice = toNumber(getField(record, ['modal_price', 'Modal_Price']));
        const arrivalDate = getField(record, ['arrival_date', 'Arrival_Date']);

        return {
          market: getField(record, ['market', 'Market']) || 'Unknown Mandi',
          commodity: getField(record, ['commodity', 'Commodity']) || commodity,
          district: getField(record, ['district', 'District']) || 'Unknown District',
          state: getField(record, ['state', 'State']) || state,
          arrival_date: arrivalDate,
          arrival_ts: toTimestamp(arrivalDate),
          min_price: minPrice,
          max_price: maxPrice,
          modal_price: modalPrice,
          profitScore: modalPrice,
        };
      })
      .filter((item) => item.modal_price > 0);

    const mandiMap = new Map();
    for (const item of filtered) {
      const key = `${normalizeText(item.market)}|${normalizeText(item.district)}|${normalizeText(item.state)}`;
      const existing = mandiMap.get(key);

      if (!existing) {
        mandiMap.set(key, item);
        continue;
      }

      const shouldReplace =
        item.profitScore > existing.profitScore ||
        (item.profitScore === existing.profitScore && item.arrival_ts > existing.arrival_ts) ||
        (item.profitScore === existing.profitScore &&
          item.arrival_ts === existing.arrival_ts &&
          item.max_price > existing.max_price);

      if (shouldReplace) {
        mandiMap.set(key, item);
      }
    }

    const stableSorted = Array.from(mandiMap.values()).sort((a, b) => {
      if (b.profitScore !== a.profitScore) {
        return b.profitScore - a.profitScore;
      }

      if (b.max_price !== a.max_price) {
        return b.max_price - a.max_price;
      }

      if (b.arrival_ts !== a.arrival_ts) {
        return b.arrival_ts - a.arrival_ts;
      }

      const marketOrder = a.market.localeCompare(b.market, 'en', { sensitivity: 'base' });
      if (marketOrder !== 0) {
        return marketOrder;
      }

      return a.district.localeCompare(b.district, 'en', { sensitivity: 'base' });
    });

    const topFive = stableSorted.slice(0, 5).map(({ arrival_ts, profitScore, ...publicItem }) => publicItem);

    const responseData = {
      success: true,
      commodity,
      state,
      totalFound: stableSorted.length,
      best: topFive[0] || null,
      mandis: topFive,
    };

    mandiCache.set(cacheKey, {
      timestamp: Date.now(),
      data: responseData,
    });

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch mandi data.',
      error: error.message,
    });
  }
};

module.exports = {
  analyzeMandi,
  getAnalysisHistory,
  getSmartMandiFinderData,
};
