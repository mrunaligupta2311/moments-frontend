let notificationHandler = null;

export const registerNotificationHandler = (handler) => {
  notificationHandler = handler;
};

export const showGlobalNotification = (message, type = "error") => {
  if (notificationHandler) {
    notificationHandler(message, type);
  }
};