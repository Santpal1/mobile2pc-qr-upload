const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Set up multer storage to save files in Desktop/QRUploads/:sessionId/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const sessionId = req.params.sessionId;
    const desktopPath = path.join(os.homedir(), 'OneDrive', 'Desktop', 'QRUploads', sessionId);

    fs.mkdirSync(desktopPath, { recursive: true });
    cb(null, desktopPath);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Generate QR code with upload link
router.get('/generate', uploadController.generateQR);

// Serve upload form page (used by phone)
router.get('/upload/:sessionId', uploadController.serveUploadForm);

// Handle file upload
router.post('/upload/:sessionId', upload.single('file'), uploadController.handleFileUpload);

module.exports = router;
