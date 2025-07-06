const QRCode = require('qrcode');

exports.generateQR = async function (url) {
  try {
    const qrDataURL = await QRCode.toDataURL(url);
    return qrDataURL;
  } catch (err) {
    console.error('QR generation error:', err);
    throw err;
  }
};
