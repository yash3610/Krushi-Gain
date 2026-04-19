const otpStore = {};

const OTP_EXPIRY_MS = 5 * 60 * 1000;
const OTP_RESEND_COOLDOWN_MS = 30 * 1000;

module.exports = {
  otpStore,
  OTP_EXPIRY_MS,
  OTP_RESEND_COOLDOWN_MS,
};
