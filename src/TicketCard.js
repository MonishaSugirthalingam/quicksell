import React, { useState } from 'react';

// Function to return different logo colors and signal levels based on priority
const getPriorityLogo = (priority) => {
  switch (priority) {
    case 4:
      return { color: '#28a745', points: 4 }; // Green for 'Urgent'
    case 3:
      return { color: '#ffc107', points: 3 }; // Orange for 'High'
    case 2:
      return { color: '#fd7e14', points: 2 }; // Orange for 'Medium'
    case 1:
      return { color: '#dc3545', points: 1 }; // Red for 'Low'
    default:
      return { color: '#6c757d', points: 1 }; // Grey for 'No priority'
  }
};

const TicketCard = ({ ticket, grouping }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(ticket.status === 'Completed');

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const priorityLogo = getPriorityLogo(ticket.priority);

  // Toggle completed status checkbox
  const handleCompletionChange = (e) => {
    setIsCompleted(e.target.checked);
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.header}>
        {/* Show Priority Logo only if grouping is not by user */}
        {grouping !== 'user' && (
          <div style={styles.signalIcon(priorityLogo.color, priorityLogo.points)}>
            {Array.from({ length: priorityLogo.points }, (_, i) => (
              <span key={i} style={styles.signalDot(priorityLogo.color, i + 1)} />
            ))}
          </div>
        )}

        {/* Show User Avatar if grouping is by user */}
        {grouping === 'user' && (
          <div style={styles.userIcon}>
            <img src="https://img.icons8.com/?size=100&id=yV78UciKeGfe&format=png&color=000000" alt="User Avatar" style={styles.avatar} />
          </div>
        )}

        <div>
          <p style={styles.ticketId}>{ticket.id}</p>
          <h4 style={styles.title}>{ticket.title}</h4>
        </div>
      </div>

      {isExpanded && (
        <div style={styles.details}>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Assigned To:</strong> {ticket.userId}</p>
          <p><strong>Priority:</strong> {getPriorityText(ticket.priority)}</p>
          <p><strong>Tag:</strong> {ticket.tag.join(', ')}</p>
        </div>
      )}

      <div style={styles.bottomBar}>
        <span style={styles.dots} onClick={toggleExpand}>...</span>

        {/* Checkbox for completed tasks */}
        {grouping === 'user' && (
          <div>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleCompletionChange}
            />
            <label>{isCompleted ? 'Completed' : 'Not Completed'}</label>
          </div>
        )}

        {/* Show tags */}
        <div style={styles.tag}>
          {ticket.tag.map((tagItem, index) => (
            <span key={index} style={styles.tagItem}>
              {tagItem}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Priority switch function
const getPriorityText = (priority) => {
  switch (priority) {
    case 4: return 'Urgent';
    case 3: return 'High';
    case 2: return 'Medium';
    case 1: return 'Low';
    default: return 'No priority';
  }
};

// Inline styles
const styles = {
  cardContainer: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    padding: '15px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  signalIcon: (color, points) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '24px',
    height: '30px',
    marginRight: '10px',
  }),
  signalDot: (color, level) => ({
    width: `${6 * level}px`,
    height: `${6 * level}px`,
    backgroundColor: color,
    borderRadius: '50%',
    marginBottom: '3px',
  }),
  userIcon: {
    marginRight: '10px',
  },
  avatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
  ticketId: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '5px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    padding: '10px 0',
    borderTop: '1px solid #eee',
    marginTop: '10px',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #eee',
    paddingTop: '10px',
  },
  dots: {
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#888',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
  },
  tagItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    marginLeft: '5px',
    color: '#555',
  },
};

export default TicketCard;
