module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const data = req.body;

    const user = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      sport: data.sport,
      created_at: new Date().toISOString(),
      verified: true,
      vip_member: true
    };

    // In production, save to Neon database here

    return res.status(200).json({
      success: true,
      message: 'Welcome to ATHLYNX! 🦁',
      user: user
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
