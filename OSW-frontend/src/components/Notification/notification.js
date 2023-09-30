import React, { useState, useEffect } from "react";
import "./notification.css";
import "./NotificationsPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import NotificationsPanel from "./notificationPanel";

const Notification = ({ message }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [panelClosing, setPanelClosing] = useState(false);

  const toggleNotifications = () => {
    if (showNotifications) {
      // Start the panel closing transition
      setPanelClosing(true);
      // Delay hiding the panel until the transition is complete
      setTimeout(() => {
        setShowNotifications(false);
        setPanelClosing(false); // Reset panel closing state
      }, 300); // Adjust the delay time to match your transition duration (0.3s in this case)
    } else {
      setShowNotifications(true);
    }
  };

  return (
    <div className="main-box">
      <button onClick={toggleNotifications} className="btn1">
        {showNotifications
          ? panelClosing
            ? "Hiding Notifications..."
            : "Hide Notifications"
          : "Show Notifications"}
      </button>
      {showNotifications && (
        <NotificationsPanel onClose={toggleNotifications} />
      )}
    </div>
  );
};

export default Notification;
