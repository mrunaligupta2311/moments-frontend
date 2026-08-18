import "./Notification.css";

function Notification({ type = "error", message, onClose }) {
  if (!message) return null;

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <strong>
          {type === "success"
            ? "Success"
            : type === "warning"
            ? "Warning"
            : "Something went wrong"}
        </strong>

        <p>{message}</p>
      </div>

      <button onClick={onClose}>×</button>
    </div>
  );
}

export default Notification;