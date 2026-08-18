import { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";
import { registerNotificationHandler } from "../services/notification";
import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext(null);

// Register the notification handler with the global service
registerNotificationHandler((message, type) => {
  // This will be called by the global notification service
});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [type, setType] = useState("error");

  const showNotification = (message, notificationType = "error") => {
    setNotification(message);
    setType(notificationType);
  };
useEffect(() => {
  registerNotificationHandler(showNotification);
}, []);

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
      }}
    >
      {children}

      {notification && (
        <Notification
          type={type}
          message={notification}
          onClose={hideNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};