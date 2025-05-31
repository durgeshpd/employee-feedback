import React from 'react';

const categories = ['All', 'Work Environment', 'Leadership', 'Growth', 'Others'];

function Filter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-6 max-w-md mx-auto">
      <label className="label font-semibold text-lg">Filter by Category:</label>
      <select
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value === '' ? null : e.target.value)}
        className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((c) => (
          <option key={c} value={c === 'All' ? '' : c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
