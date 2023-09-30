import React, { useState, useEffect } from "react";
import "./NotificationsPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { hostname } from "../../hostname";
import { useNavigate } from "react-router-dom";
import TruncateText from "../TruncateText";

const NotificationsPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(true);
  const getUserNotifications = async () => {
    try {
      const response = await fetch(`${hostname}/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("userAuthToken"), // Add your authentication token here
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("User notifications:", data.notifications);
      setNotifications(data.notifications);
      // Handle success here
    } catch (error) {
      console.error("Error fetching user notifications:", error.message);
      // Handle error here
    }
  };

  useEffect(() => {
    if (panelOpen) {
      getUserNotifications();
    }
  }, [panelOpen]);

  const removeNotification = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`${hostname}/notifications/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("userAuthToken"), // Add your authentication token here

          // You may need to include authentication headers here
        },
        body: JSON.stringify({ notificationID: id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Notification deletion response:", data);
      // Handle the response data as needed
      getUserNotifications();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const visitNotificationLink = (link, id) => {
    markAsVisited(id);
    navigate(link);
  };

  const markAsVisited = (id) => {
    fetch(`${hostname}/notifications/updatestatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("userAuthToken"), // Add your authentication token here
      },
      body: JSON.stringify({ notificationID: id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Read status updated successfully:", data);
        getUserNotifications();
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const deleteAllNotifications = () => {
    fetch(`${hostname}/notifications/delete-all`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("userAuthToken"), // Include your access token if needed
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getUserNotifications();
        // Handle success or update UI accordingly
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error or update UI accordingly
      });
  };

  const MarkAllNotificationsRead = async () => {
    console.log(1);
    try {
      const response = await fetch(
        `${hostname}/notifications/updatestatus-all`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("userAuthToken"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read.");
      }

      const data = await response.json();
      console.log(data); // Handle the response data
      getUserNotifications();
    } catch (error) {
      console.error("Error marking all notifications as read:", error.message);
    }
  };

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
    onClose();
  };

  const panelStyle = {
    transform: panelOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
  };

  useEffect(() => {
    // Open the panel when the component first appears
    setPanelOpen(true);
  }, []);

  return (
    <div className="notifications-panel" style={panelStyle}>
      <div className="panel-header">
        <h2>Notifications</h2>
        <button
          className="close-button"
          onClick={togglePanel}
          style={{ color: "white", fontSize: "24px", marginTop: "-1vh" }}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "visited" : ""
              }`}
            >
              <div className="msg">
                <TruncateText text={notification.content} maxChars={70} />
              </div>
              <div className="two-buttons">
                <button
                  className="mark-as-read"
                  id="btn"
                  onClick={() => markAsVisited(notification._id)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="delete-notificaton"
                  id="btn"
                  onClick={() => removeNotification(notification._id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <button
                // className="delete-notificaton"
                onClick={() =>
                  visitNotificationLink(notification.link, notification._id)
                }
                // onClick={() => removeNotification(notification._id)}
              >
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </button>
            </div>
          ))
        )}
      </div>
      {notifications.length > 0 && (
        <div className="panel-footer">
          <button
            className="delete-all-button"
            onClick={() => deleteAllNotifications()}
          >
            Delete All Readed
          </button>
          <button
            className="mark-as-read-all-button"
            onClick={() => MarkAllNotificationsRead()}
          >
            Marks All as Read
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
