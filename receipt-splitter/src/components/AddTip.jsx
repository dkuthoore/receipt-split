import React, { useState } from 'react';
import './styles/components.css';

function AddTip({ onAddTip, currentTip }) {
  const [tipAmount, setTipAmount] = useState(currentTip.toString());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipAmount) {
      onAddTip(parseFloat(tipAmount));
      // Don't reset the input value since we want to show the current tip
    }
  };

  return (
    <div className="add-tip">
      <h3>Add/Update Tip</h3>
      <form onSubmit={handleSubmit} className="tip-form">
        <div className="input-group">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            placeholder="Enter tip amount"
            step="0.01"
            min="0"
            required
          />
        </div>
        <button type="submit" className="modern-button primary">Update Tip</button>
      </form>
    </div>
  );
}

export default AddTip; 