# Receipt Splitter

A modern web application that makes splitting restaurant bills effortless using AI-powered receipt processing.

## Features

- **AI Receipt Processing**: Leverages Claude 3.5 Sonnet to automatically extract items, prices, and other details from receipt images
- **Smart Item Assignment**: Easily assign menu items to different people in your group
- **Real-time Calculations**: Automatically calculates individual totals including tax and tip
- **User-Friendly Interface**: Simple and intuitive design for quick bill splitting

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **AI Integration**: Claude 3.5 Sonnet API for image processing
- **Image Processing**: Base64 image handling for receipt uploads

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Claude API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/receipt-splitter.git
```

2. Navigate to the project directory:

```bash
cd receipt-splitter
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

```bash
cp .env.example .env
```

5. Start the development server:

```bash
npm start
```

6. Build the project for production:

```bash
npm run build
```

7. Deploy the project:

```bash
npm run deploy
```

## Learn More

You can learn more about the project and its features on the [project website](https://receipt-splitter.com).
