const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const codes = global.verificationCodes || new Map();
global.verificationCodes = codes;

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
    codes.set(phone, { code, expires: Date.now() + 600000 });

    if (accountSid && authToken) {
      const client = twilio(accountSid, authToken);
      const message = await client.messages.create({
        body: `🦁 ATHLYNX Verification Code: ${code}\n\nWelcome ${name}! Enter this code to claim your VIP spot.\n\nDreams Do Come True 2026!`,
        from: twilioPhone,
        to: phone
      });
      return res.status(200).json({ success: true, message: 'SMS sent', sid: message.sid, channel: 'sms' });
    }

    return res.status(200).json({ success: true, message: 'Code generated (SMS pending config)', channel: 'sms' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
