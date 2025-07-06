const os = require('os');
const path = require('path');
const qr = require('../utils/qrGenerator');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }
  return 'localhost'; // fallback
}

exports.generateQR = (req, res) => {
  const sessionId = Math.random().toString(36).substring(2, 10);
  const ip = getLocalIP();
  const port = process.env.PORT || 5000;
  const uploadUrl = `http://${ip}:${port}/upload/${sessionId}`;

  qr.generateQR(uploadUrl)
    .then((qrDataUrl) => {
      res.json({ sessionId, uploadUrl, qr: qrDataUrl });
    })
    .catch((err) => {
      console.error('QR Generation failed:', err);
      res.status(500).json({ error: 'Failed to generate QR code' });
    });
};


exports.serveUploadForm = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'uploadForm.html'));
};

exports.handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log(`✅ File uploaded: ${req.file.filename}`);
  res.send('File uploaded successfully!');
};
