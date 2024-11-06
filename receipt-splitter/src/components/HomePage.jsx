import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/components.css';

function HomePage() {
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      navigate('/receipt', { 
        state: { 
          imageFile: file,
          imagePreview: base64Image
        } 
      });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container">
      <div className="receipt-form">
        <h1>Receipt Splitter</h1>
        
        <div className="upload-section">
          <label htmlFor="receipt-upload" className="upload-button">
            <span className="upload-icon">📷</span>
            Upload Receipt
            <input
              id="receipt-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
          <p className="upload-hint">Supported formats: JPG, PNG</p>
        </div>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">📷</span>
            <h3>Upload Receipt</h3>
            <p>Take a photo or upload an image of your receipt</p>
          </div>
          <div className="feature">
            <span className="feature-icon">👥</span>
            <h3>Add People</h3>
            <p>Add the people who shared the bill</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💰</span>
            <h3>Split Items</h3>
            <p>Assign items to people and split fairly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 