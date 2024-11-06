import React from 'react';
import './styles/components.css';

function ItemList({ items, people, onUpdateSharing }) {
  const handleShareToggle = (itemId, personId) => {
    const item = items.find(i => i.id === itemId);
    const newSharedBy = item.sharedBy.includes(personId)
      ? item.sharedBy.filter(id => id !== personId)
      : [...item.sharedBy, personId];
    
    onUpdateSharing(itemId, newSharedBy);
  };

  return (
    <div className="table-container">
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Shared By</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div className="share-buttons">
                  {people.map(person => (
                    <button
                      key={person.id}
                      className={`share-toggle ${item.sharedBy.includes(person.id) ? 'active' : ''}`}
                      onClick={() => handleShareToggle(item.id, person.id)}
                    >
                      {person.name}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList; 