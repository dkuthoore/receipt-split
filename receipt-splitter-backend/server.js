require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

app.post('/api/process-receipt', async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY is not set');
      throw new Error('API key not configured');
    }

    console.log('Making request to Claude API...');
    console.log('API URL:', ANTHROPIC_API_URL);
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'x-api-key': 'sk-ant-api03-*****', // Masked for security
      'anthropic-version': '2023-06-01'
    });

    const response = await axios.post(
      ANTHROPIC_API_URL,
      {
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this receipt image and extract the following information in a structured JSON format: items (with names and prices), subtotal amount, tax amount, tip amount (if present), total amount, establishment name, and date. Format the response exactly as a JSON object with these fields: items (array of objects with name and price), subtotal (number), tax (number), tip (number), total (number), establishment (string), date (YYYY-MM-DD string)."
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: image.split(',')[1]
              }
            }
          ]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    console.log('Claude API Response:', response.data);

    const content = response.data.content[0].text;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from Claude response');
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    console.log('Parsed Data:', parsedData);
    res.json(parsedData);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      config: error.config
    });

    res.status(500).json({ 
      error: 'Failed to process receipt',
      details: error.message,
      response: error.response?.data
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables loaded:', {
    CLAUDE_API_KEY: CLAUDE_API_KEY ? 'Set' : 'Not set',
    PORT
  });
}); 