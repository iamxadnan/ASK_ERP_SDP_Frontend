import React, { useEffect, useState } from 'react';

import StudentNavBar from './StudentNavBar';

function GetNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2001/student/getnotifications")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return response.json();
      })
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length !== 5) {
      return "Invalid Date";
    }
    // Convert array to Date object: [year, month, day, hour, minute]
    const [year, month, day, hour, minute] = dateArray;
    return new Date(year, month - 1, day, hour, minute).toLocaleString(); // Adjust month (0-based)
  };

  return (
    <div>
      
      <div className="notifications-container">
        <h2>Recent Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications available</p>
        ) : (
          notifications.map((notification, index) => (
            <div className="notification-card" key={index}>
              <h3>{notification.mesg}</h3>
              <p><strong>Scheduled Time:</strong> {formatDate(notification.scheduledTime)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GetNotifications;
