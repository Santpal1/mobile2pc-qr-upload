import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [qr, setQr] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/generate');
      setQr(res.data.qr);
      setUploadUrl(res.data.uploadUrl);
    } catch (err) {
      alert('Error generating QR code.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">📤 QR File Uploader</h1>
      <button onClick={generateQR} className="generate-btn" disabled={loading}>
        {loading ? 'Generating QR...' : 'Generate QR'}
      </button>

      {qr && (
        <div className="qr-section">
          <p>Scan this QR on your phone:</p>
          <img src={qr} alt="QR Code" className="qr-img" />
          <p className="upload-url">{uploadUrl}</p>
        </div>
      )}
    </div>
  );
}

export default App;
