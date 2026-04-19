const User = require('../models/User');
const { sendWhatsAppTextMessage } = require('../utils/whatsapp');

const DEFAULT_COUNTRY_CODE = String(process.env.WHATSAPP_DEFAULT_COUNTRY_CODE || '91').replace(/\D/g, '');

const normalizePhoneNumber = (phone = '') => {
  let digits = String(phone).replace(/\D/g, '');

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  if (digits.startsWith('0') && digits.length > 10) {
    digits = digits.replace(/^0+/, '');
  }

  if (digits.length === 10 && DEFAULT_COUNTRY_CODE) {
    digits = `${DEFAULT_COUNTRY_CODE}${digits}`;
  }

  return digits;
};

const formatCurrency = (value) => Number(value || 0).toLocaleString('en-IN');

const buildAnalysisMessage = ({
  crop,
  quantity,
  currentMandi,
  currentPrice,
  recommendedMandi,
  predictedPrice,
  distance,
  transportCost,
  profit,
}) => {
  return `🌾 The Farmer's Profit Maximizer\n\n📊 Crop Analysis Result:\n\n🌱 Crop: ${crop}\n📦 Quantity: ${quantity} Quintal\n\n📍 Current Mandi: ${currentMandi}\n💰 Current Price: ₹${formatCurrency(currentPrice)} / quintal\n\n🏆 Recommended Mandi: ${recommendedMandi}\n📈 Predicted Price: ₹${formatCurrency(predictedPrice)} / quintal\n\n🚚 Distance: ${distance} km\n💸 Transport Cost: ₹${formatCurrency(transportCost)}\n\n💵 Expected Profit: ₹${formatCurrency(profit)}\n\n✅ Suggestion: Sell your crop in ${recommendedMandi} mandi for maximum profit.`;
};

const buildSmartMandiFinderMessage = ({ commodity, state, mandis }) => {
  const topMandi = mandis[0];
  const topLines = mandis
    .slice(0, 5)
    .map(
      (mandi, index) =>
        `${index + 1}. ${mandi.market} (${mandi.district}) - ₹${formatCurrency(mandi.modal_price)}/quintal`
    )
    .join('\n');

  return `🌾 Krushi Gain - Smart Mandi Finder\n\n🌱 Crop: ${commodity}\n📍 State: ${state}\n\n🏆 Best Mandi: ${topMandi.market}, ${topMandi.district}\n💰 Best Modal Price: ₹${formatCurrency(topMandi.modal_price)}/quintal\n\n📊 Top 5 Mandis:\n${topLines}\n\n✅ Suggestion: Sell in ${topMandi.market} mandi for better return.`;
};

const sendResultOnWhatsApp = async (req, res) => {
  try {
    const {
      phone,
      crop,
      quantity,
      currentMandi,
      currentPrice,
      recommendedMandi,
      predictedPrice,
      distance,
      transportCost,
      profit,
    } = req.body;

    const requiredFields = {
      crop,
      quantity,
      currentMandi,
      currentPrice,
      recommendedMandi,
      predictedPrice,
      distance,
      transportCost,
      profit,
    };

    const missingField = Object.entries(requiredFields).find(([, value]) => value === undefined || value === null || value === '');
    if (missingField) {
      return res.status(400).json({ message: `Missing required field: ${missingField[0]}` });
    }

    let destinationPhone = normalizePhoneNumber(phone);

    if (!destinationPhone) {
      const user = await User.findById(req.user.id).select('phone');
      destinationPhone = normalizePhoneNumber(user?.phone);
    }

    if (!destinationPhone || destinationPhone.length < 10 || destinationPhone.length > 15) {
      return res.status(400).json({ message: 'Valid WhatsApp phone number is required' });
    }

    const message = buildAnalysisMessage({
      crop,
      quantity,
      currentMandi,
      currentPrice,
      recommendedMandi,
      predictedPrice,
      distance,
      transportCost,
      profit,
    });

    await sendWhatsAppTextMessage(destinationPhone, message);

    return res.status(200).json({ message: 'Result sent on WhatsApp', phone: destinationPhone });
  } catch (error) {
    const isRecipientAllowedListIssue = error.message.includes('Recipient phone number not in allowed list');

    return res.status(isRecipientAllowedListIssue ? 400 : 500).json({
      message: isRecipientAllowedListIssue
        ? 'Recipient number is not in Meta WhatsApp allowed list'
        : 'Failed to send result on WhatsApp',
      error: error.message,
    });
  }
};

const sendSmartMandiResultOnWhatsApp = async (req, res) => {
  try {
    const { phone, commodity, state, mandis } = req.body;

    if (!commodity || !state || !Array.isArray(mandis) || !mandis.length) {
      return res.status(400).json({ message: 'commodity, state and mandis are required' });
    }

    const hasInvalidMandi = mandis.some((mandi) => !mandi?.market || !mandi?.district || mandi?.modal_price === undefined);
    if (hasInvalidMandi) {
      return res.status(400).json({ message: 'Invalid mandi data received' });
    }

    let destinationPhone = normalizePhoneNumber(phone);

    if (!destinationPhone) {
      const user = await User.findById(req.user.id).select('phone');
      destinationPhone = normalizePhoneNumber(user?.phone);
    }

    if (!destinationPhone || destinationPhone.length < 10 || destinationPhone.length > 15) {
      return res.status(400).json({ message: 'Valid WhatsApp phone number is required in user profile' });
    }

    const message = buildSmartMandiFinderMessage({ commodity, state, mandis });

    await sendWhatsAppTextMessage(destinationPhone, message);

    return res.status(200).json({ message: 'Smart mandi result sent on WhatsApp', phone: destinationPhone });
  } catch (error) {
    const isRecipientAllowedListIssue = error.message.includes('Recipient phone number not in allowed list');

    return res.status(isRecipientAllowedListIssue ? 400 : 500).json({
      message: isRecipientAllowedListIssue
        ? 'Recipient number is not in Meta WhatsApp allowed list'
        : 'Failed to send smart mandi result on WhatsApp',
      error: error.message,
    });
  }
};

module.exports = {
  sendResultOnWhatsApp,
  sendSmartMandiResultOnWhatsApp,
};
