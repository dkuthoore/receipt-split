import React, { useState } from 'react';
import './styles/components.css';

function PersonList({ people, onAddPerson }) {
  const [newPersonName, setNewPersonName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPersonName.trim()) {
      onAddPerson(newPersonName.trim());
      setNewPersonName('');
    }
  };

  return (
    <div className="people-list">
      <table className="people-table">
        <thead>
          <tr>
            <th colSpan="2">People</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.id}>
              <td>{person.name}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2">
              <form onSubmit={handleSubmit} className="add-person-form">
                <input
                  type="text"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  placeholder="Enter name"
                />
                <button type="submit" className="modern-button primary">Add</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PersonList; 