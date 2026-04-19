const sendWhatsAppTextMessage = async (phone, body) => {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    throw new Error('Missing WhatsApp API credentials in environment variables');
  }

  const endpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phone,
      type: 'text',
      text: {
        body,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data?.error?.message || 'Unknown WhatsApp API error';
    throw new Error(errorMessage);
  }

  return data;
};

const sendWhatsAppOtp = async (phone, otp) => {
  return sendWhatsAppTextMessage(phone, `Your OTP is ${otp}`);
};

module.exports = {
  sendWhatsAppTextMessage,
  sendWhatsAppOtp,
};
