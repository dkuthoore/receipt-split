import React from 'react';

function ShareTable({ people, items, tax, tip }) {
  // Calculate shares for each person
  const calculateShares = () => {
    const shares = {};
    
    // Initialize shares for each person
    people.forEach(person => {
      shares[person.id] = 0;
    });

    // Calculate item shares
    items.forEach(item => {
      const numSharing = item.sharedBy.length;
      if (numSharing > 0) {
        const shareAmount = item.price / numSharing;
        item.sharedBy.forEach(personId => {
          shares[personId] += shareAmount;
        });
      }
    });

    // Calculate tax and tip shares
    const totalBeforeTaxAndTip = items.reduce((sum, item) => sum + item.price, 0);
    const taxRatio = tax / totalBeforeTaxAndTip;
    const tipRatio = tip / totalBeforeTaxAndTip;

    // Add tax and tip proportionally
    Object.keys(shares).forEach(personId => {
      const personShare = shares[personId];
      shares[personId] += personShare * taxRatio; // Add tax share
      shares[personId] += personShare * tipRatio; // Add tip share
    });

    return shares;
  };

  const shares = calculateShares();

  return (
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
            <td className="amount">${shares[person.id].toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ShareTable; 