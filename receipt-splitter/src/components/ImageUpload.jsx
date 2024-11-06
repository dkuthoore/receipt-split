import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/components.css';

function ImageUpload({ onUpload, isProcessing }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.imagePreview) {
      setPreview(location.state.imagePreview);
    }
  }, [location]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onUpload(file);
    }
  };

  return (
    <div className="image-upload">
      <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          disabled={isProcessing}
          style={{ display: 'none' }}
        />
        <button 
          className="modern-button primary"
          onClick={() => fileInputRef.current.click()}
          disabled={isProcessing}
        >
          {preview ? 'Change Receipt' : 'Upload Receipt'}
        </button>
      </div>
      
      {isProcessing && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Processing receipt...</p>
        </div>
      )}
      
      {preview && (
        <div className="preview-container">
          <img 
            src={preview} 
            alt="Receipt preview" 
            className="receipt-preview"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload; 