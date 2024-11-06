import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddItem from './AddItem';
import PersonList from './PersonList';
import ItemList from './ItemList';
import Summary from './Summary';
import ImageUpload from './ImageUpload';
import AddTip from './AddTip';
import './styles/components.css';
import { processReceiptWithClaude } from '../api/claude';

function Receipt() {
  const [items, setItems] = useState([]);
  const [people, setPeople] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [receiptMetadata, setReceiptMetadata] = useState({
    subtotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
    establishment: '',
    date: new Date().toISOString().split('T')[0]
  });

  const location = useLocation();

  // Process the image when component mounts if it exists in location state
  useEffect(() => {
    const imageData = location.state?.imageFile;
    const imagePreview = location.state?.imagePreview;
    
    if (imageData) {
      processReceiptImage(imageData, imagePreview);
    }
  }, []);

  const processReceiptImage = async (imageFile, existingPreview = null) => {
    setIsProcessing(true);
    setError(null);
    try {
      console.log('Processing receipt image...');
      const base64Image = existingPreview || await convertToBase64(imageFile);
      
      console.log('Calling Claude API...');
      const data = await processReceiptWithClaude(base64Image);
      console.log('Received data from Claude:', data);
      
      // Transform items to include sharing information
      setItems(data.items.map(item => ({
        ...item,
        id: Date.now() + Math.random(),
        sharedBy: [], // Array of person IDs sharing this item
        price: parseFloat(item.price)
      })));
      
      setReceiptMetadata({
        subtotal: parseFloat(data.subtotal) || 0,
        tax: parseFloat(data.tax) || 0,
        tip: parseFloat(data.tip) || 0,
        total: parseFloat(data.total) || 0,
        establishment: data.establishment || '',
        date: data.date || new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Detailed error processing receipt:', error);
      let errorMessage = 'Failed to process receipt: ';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage += error.response.data?.error || error.response.statusText;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage += 'No response from server. Please check your internet connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage += error.message || 'Unknown error';
      }
      
      setError(`${errorMessage}. Please try again.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const addItem = (newItem) => {
    setItems([...items, { 
      ...newItem, 
      id: Date.now(),
      sharedBy: []
    }]);
  };

  const addPerson = (name) => {
    setPeople([...people, { 
      id: Date.now(), 
      name,
      totalShare: 0
    }]);
  };

  const updateItemSharing = (itemId, personIds) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, sharedBy: personIds }
        : item
    ));
  };

  const handleTipUpdate = (newTip) => {
    setReceiptMetadata(prev => ({
      ...prev,
      tip: newTip,
      total: prev.total - prev.tip + newTip // Update total by removing old tip and adding new tip
    }));
  };

  return (
    <div className="receipt-page">
      <div className="receipt-container">
        <div className="receipt-layout">
          {/* Left Panel - Image */}
          <div className="receipt-left-panel">
            <ImageUpload 
              onUpload={processReceiptImage} 
              isProcessing={isProcessing} 
            />
          </div>
          
          {/* Right Panel - All Controls */}
          <div className="receipt-right-panel">
            {error && <div className="error-message">{error}</div>}
            
            {/* Restaurant Info */}
            <div className="establishment-info">
              <h2 className="establishment-name">{receiptMetadata.establishment || 'Receipt Summary'}</h2>
              <p className="receipt-date">{receiptMetadata.date}</p>
            </div>
            
            {/* Main Content */}
            <div className="main-content">
              <Summary 
                items={items} 
                people={people}
                subtotal={receiptMetadata.subtotal}
                tax={receiptMetadata.tax}
                tip={receiptMetadata.tip}
                total={receiptMetadata.total}
                onTipUpdate={handleTipUpdate}
              />
              
              <PersonList 
                people={people} 
                onAddPerson={addPerson} 
              />
            </div>
            
            {/* Items Section */}
            <div className="items-section">
              <ItemList 
                items={items}
                people={people}
                onUpdateSharing={updateItemSharing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default Receipt; 