function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { email, name = 'Athlete' } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email required' });

    const code = generateCode();
    return res.status(200).json({ success: true, message: 'Email verification code generated', channel: 'email', code: code });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
