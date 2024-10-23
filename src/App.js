import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping by status
  const [sortOption, setSortOption] = useState('priority'); // Default sort by priority

  // Fetch tickets from API when the component mounts
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => setTickets(data.tickets))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Retrieve saved state from localStorage when the component mounts
  useEffect(() => {
    const savedGrouping = localStorage.getItem('grouping');
    const savedSortOption = localStorage.getItem('sortOption');

    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSortOption) setSortOption(savedSortOption);
  }, []);

  // Save the current state (grouping and sortOption) to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sortOption', sortOption);
  }, [grouping, sortOption]);

  // Handle changes in the grouping dropdown
  const handleGroupChange = (e) => {
    setGrouping(e.target.value);
  };

  // Handle changes in the sorting dropdown
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="app">
      {/* Controls for selecting grouping and sorting */}
      <div className="controls">
        <label>
          Group by:
          <select onChange={handleGroupChange} value={grouping}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>

        <label>
          Sort by:
          <select onChange={handleSortChange} value={sortOption}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      {/* Render the KanbanBoard component with tickets, grouping, and sorting */}
      <KanbanBoard tickets={tickets} grouping={grouping} sortOption={sortOption} />
    </div>
  );
};

export default App;