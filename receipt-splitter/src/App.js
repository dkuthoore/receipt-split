import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Receipt from './components/Receipt';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 