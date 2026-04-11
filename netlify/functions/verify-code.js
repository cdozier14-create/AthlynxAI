const codes = global.verificationCodes || new Map();
global.verificationCodes = codes;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { identifier, code } = req.body;
    if (!identifier || !code) return res.status(400).json({ success: false, error: 'Identifier and code required' });

    const stored = codes.get(identifier);
    if (!stored) return res.status(200).json({ success: false, message: 'No verification code found', verified: false });
    if (Date.now() > stored.expires) {
      codes.delete(identifier);
      return res.status(200).json({ success: false, message: 'Code expired', verified: false });
    }
    if (stored.code !== code) return res.status(200).json({ success: false, message: 'Invalid code', verified: false });

    codes.delete(identifier);
    return res.status(200).json({ success: true, message: 'Verified successfully', verified: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
