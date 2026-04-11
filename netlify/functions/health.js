module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    status: 'healthy',
    service: 'ATHLYNX Verification API',
    version: '1.0.0',
    channels: ['sms', 'whatsapp', 'email'],
    timestamp: new Date().toISOString()
  });
};
