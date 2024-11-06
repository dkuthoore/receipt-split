import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export async function processReceiptWithClaude(imageBase64) {
  try {
    console.log('Starting API call to backend...');
    
    const response = await axios.post(`${API_URL}/process-receipt`, {
      image: imageBase64
    });

    if (!response.data.subtotal) {
      console.warn('No subtotal found in response');
    }

    console.log('Backend Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error processing receipt:', error);
    throw error;
  }
} 