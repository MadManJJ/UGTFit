import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SortingOptions ({ onSortChange }) {
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortingCriteria = [
    { value: 'load', label: 'Load' },
    { value: 'reps', label: 'Reps' },
    { value: 'createdAt', label: 'Date Created' }
  ];

  const handleSortChange = (e) => {
    setSortField(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSubmit = () => {
    onSortChange(sortField, sortOrder);
  };

  return (
    <div className="sorting-options">
      <select onChange={handleSortChange} value={sortField} className="sort-select">
        {sortingCriteria.map((criteria) => (
          <option key={criteria.value} value={criteria.value}>
            Sort by: {criteria.label}
          </option>
        ))}
      </select>
      <select onChange={handleOrderChange} value={sortOrder} className="order-select">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <button onClick={handleSubmit} className="sort-button">Apply Sort</button>
    </div>
  );
};

SortingOptions.propTypes = {
  onSortChange: PropTypes.func
};

export default SortingOptions;