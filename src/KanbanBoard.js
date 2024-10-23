import React from 'react';
import TicketCard from './TicketCard';

const KanbanBoard = ({ tickets, grouping, sortOption }) => {

  const groupTickets = (tickets) => {
    if (grouping === 'status') {
      return groupBy(tickets, 'status');
    } else if (grouping === 'user') {
      return groupBy(tickets, 'assigned_to');
    } else {
      return groupBy(tickets, 'priority');
    }
  };

  const sortTickets = (t) => {
    if (sortOption === 'priority') {
      return t.sort((a, b) => b.priority - a.priority);
    } else {
      return t.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  const groupedTickets = groupTickets(sortTickets(tickets));

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map(group => (
        <div key={group} className="kanban-group">
          <h3>{group}</h3>
          <div className="kanban-group-items">
            {groupedTickets[group].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} grouping={grouping} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const groupBy = (arr, key) => {
  return arr.reduce((acc, obj) => {
    const group = obj[key] || 'No Group';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(obj);
    return acc;
  }, {});
};

export default KanbanBoard;
