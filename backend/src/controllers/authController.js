const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { otpStore, OTP_EXPIRY_MS, OTP_RESEND_COOLDOWN_MS } = require('../utils/otpStore');
const { sendWhatsAppOtp } = require('../utils/whatsapp');

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

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
const isDevOtpFallbackEnabled = process.env.OTP_DEV_FALLBACK === 'true';

const signup = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = signToken(user);

    return res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const sendOtp = async (req, res) => {
  try {
    const phone = normalizePhoneNumber(req.body.phone);

    if (!phone || phone.length < 10 || phone.length > 15) {
      return res.status(400).json({ message: 'Enter a valid phone number with country code' });
    }

    const existingOtp = otpStore[phone];
    if (existingOtp && existingOtp.resendAvailableAt > Date.now()) {
      const retryAfter = Math.ceil((existingOtp.resendAvailableAt - Date.now()) / 1000);
      return res.status(429).json({ message: `Please wait ${retryAfter}s before resending OTP` });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    otpStore[phone] = {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
      resendAvailableAt: Date.now() + OTP_RESEND_COOLDOWN_MS,
    };

    try {
      await sendWhatsAppOtp(phone, otp);

      return res.status(200).json({
        message: 'OTP sent successfully on WhatsApp',
        expiresInSeconds: Math.floor(OTP_EXPIRY_MS / 1000),
        resendInSeconds: Math.floor(OTP_RESEND_COOLDOWN_MS / 1000),
      });
    } catch (whatsAppError) {
      if (isDevOtpFallbackEnabled) {
        return res.status(200).json({
          message: 'WhatsApp delivery failed. Dev OTP fallback enabled',
          warning: whatsAppError.message,
          devOtp: otp,
          expiresInSeconds: Math.floor(OTP_EXPIRY_MS / 1000),
          resendInSeconds: Math.floor(OTP_RESEND_COOLDOWN_MS / 1000),
        });
      }

      const isRecipientAllowedListIssue = whatsAppError.message.includes('Recipient phone number not in allowed list');
      const statusCode = isRecipientAllowedListIssue ? 400 : 502;

      return res.status(statusCode).json({
        message: isRecipientAllowedListIssue
          ? 'This number is not in your WhatsApp test allowed list. Add it in Meta dashboard or enable OTP_DEV_FALLBACK for local testing.'
          : 'Failed to send OTP via WhatsApp',
        error: whatsAppError.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const phone = normalizePhoneNumber(req.body.phone);
    const inputOtp = String(req.body.otp || '');

    if (!phone || !inputOtp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    const storedOtp = otpStore[phone];
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not found or already used' });
    }

    if (Date.now() > storedOtp.expiresAt) {
      delete otpStore[phone];
      return res.status(400).json({ message: 'OTP expired. Please request a new OTP' });
    }

    if (storedOtp.otp !== inputOtp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    delete otpStore[phone];

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        name: `Farmer ${phone.slice(-4)}`,
        phone,
      });
    }

    const token = signToken(user);

    return res.status(200).json({
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'OTP verification failed', error: error.message });
  }
};

module.exports = {
  signup,
  login,
  sendOtp,
  verifyOtp,
};
