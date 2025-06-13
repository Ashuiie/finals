import React from "react";

function Filter({ keyword, sortBy, onChangeKeyword, onChangeSort }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-4">
      <label className="block text-sm font-medium text-gray-700">
         Choose a filter:
      </label>

      <input
        type="text"
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
        placeholder="Filter by keywords..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={sortBy}
        onChange={(e) => onChangeSort(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="date"> Publication Date</option>
        <option value="relevance"> Relevance</option>
      </select>
    </div>
  );
}

export { Filter };
