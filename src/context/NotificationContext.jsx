import Notification from "../components/Notification";
import { registerNotificationHandler } from "../services/notification";
import { createContext, useContext, useEffect, useState } from "react";
const NotificationContext = createContext(null);


export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [type, setType] = useState("error");
const [actionLabel, setActionLabel] = useState(null);
const [actionHandler, setActionHandler] = useState(null);
  const showNotification = (
  message,
  notificationType = "error",
  label = null,
  handler = null
) => {
  setNotification(message);
  setType(notificationType);
  setActionLabel(label);
  setActionHandler(() => handler);
};
useEffect(() => {
  registerNotificationHandler(showNotification);

  return () => {
    registerNotificationHandler(null);
  };
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
  actionLabel={actionLabel}
  onAction={actionHandler}
/>)}
</NotificationContext.Provider>);
};

export const useNotification = () => {
  return useContext(NotificationContext);
};