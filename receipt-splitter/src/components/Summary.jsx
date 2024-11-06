import React, { useState } from 'react';
import './styles/components.css';

function Summary({ items, people, tax, tip, total, subtotal, onTipUpdate }) {
  const [isEditingTip, setIsEditingTip] = useState(false);
  const [tempTip, setTempTip] = useState(tip);

  const calculateShare = (personId) => {
    let itemShare = 0;
    let personTotal = 0;
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    
    items.forEach(item => {
      if (item.sharedBy.includes(personId)) {
        const shareAmount = item.price / item.sharedBy.length;
        itemShare += shareAmount;
        personTotal += shareAmount;
      }
    });
    
    const proportionalShare = subtotal > 0 ? (personTotal / subtotal) : (1 / people.length);
    const tipShare = proportionalShare * tip;
    const taxShare = proportionalShare * tax;
    
    return itemShare + tipShare + taxShare;
  };

  const calculateTotalShares = () => {
    return people.reduce((sum, person) => sum + calculateShare(person.id), 0);
  };

  const handleTipEdit = () => {
    setIsEditingTip(true);
    setTempTip(tip);
  };

  const handleTipSave = () => {
    onTipUpdate(parseFloat(tempTip));
    setIsEditingTip(false);
  };

  const handleTipKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTipSave();
    } else if (e.key === 'Escape') {
      setIsEditingTip(false);
      setTempTip(tip);
    }
  };

  return (
    <div className="summary-container">
      <div className="summary-tables">
        <table className="totals-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td className="amount">${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td className="amount">${tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Tip</td>
              <td className="amount editable" onClick={handleTipEdit}>
                {isEditingTip ? (
                  <div className="tip-edit">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      value={tempTip}
                      onChange={(e) => setTempTip(e.target.value)}
                      onBlur={handleTipSave}
                      onKeyDown={handleTipKeyPress}
                      step="0.01"
                      min="0"
                      autoFocus
                    />
                  </div>
                ) : (
                  <span className="editable-value">${tip.toFixed(2)} ✎</span>
                )}
              </td>
            </tr>
            <tr className="total-row">
              <td>Total</td>
              <td className="amount">${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <table className="shares-table">
          <thead>
            <tr>
              <th>Person</th>
              <th>Share</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td className="amount">${calculateShare(person.id).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td>Total</td>
              <td className="amount">${calculateTotalShares().toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Summary; 