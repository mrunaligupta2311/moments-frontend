let notificationHandler = null;

export const registerNotificationHandler = (handler) => {
  notificationHandler = handler;
};
export const showGlobalNotification = (
  message,
  type = "error",
  actionLabel = null,
  onAction = null
) => {
  if (notificationHandler) {
    notificationHandler(message, type, actionLabel, onAction);
  }
};
