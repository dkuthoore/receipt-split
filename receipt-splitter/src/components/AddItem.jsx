import React, { useState } from 'react';
import './styles/components.css';

function AddItem({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim() && itemPrice) {
      onAddItem({
        name: itemName.trim(),
        price: parseFloat(itemPrice)
      });
      setItemName('');
      setItemPrice('');
    }
  };

  return (
    <div className="add-item">
      <h3>Add Item Manually</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          required
        />
        <input
          type="number"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          placeholder="Price"
          step="0.01"
          min="0"
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem; 