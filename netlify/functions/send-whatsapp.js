const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { phone, name = 'Athlete' } = req.body;
    if (!phone) return res.status(400).json({ success: false, error: 'Phone number required' });

    const code = generateCode();
    const whatsappTo = phone.startsWith('whatsapp:') ? phone : `whatsapp:${phone}`;

    if (accountSid && authToken) {
      const client = twilio(accountSid, authToken);
      const message = await client.messages.create({
        body: `🦁 ATHLYNX Verification Code: ${code}\n\nWelcome ${name}! Dreams Do Come True 2026!`,
        from: whatsappNumber,
        to: whatsappTo
      });
      return res.status(200).json({ success: true, message: 'WhatsApp sent', sid: message.sid, channel: 'whatsapp' });
    }

    return res.status(200).json({ success: true, message: 'Code generated (WhatsApp pending config)', channel: 'whatsapp' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
