import "./Notification.css";

function Notification({
  type = "error",
  message,
  onClose,
  actionLabel,
  onAction,
}) {

  return (
   <div className="notification-backdrop">
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

   
   {actionLabel && onAction ? (
  <button onClick={onAction}>
    {actionLabel}
  </button>
) : (
  <button onClick={onClose}>OK</button>
)}
   
   
    </div>
</div>

  );
}

export default Notification;