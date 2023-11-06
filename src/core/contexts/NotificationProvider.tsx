import { PropsWithChildren, createContext, useContext, useState } from "react";

type NotificationType = "success" | "error" | "info";

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  context?: string;
  timeout?: number;
}

interface NotificationContext {
  queue: Notification[];
  clear: () => void;
  dismiss: (id: number) => void;
  success: (message: string, context?: string) => void;
  error: (message: string, context?: string) => void;
  info: (message: string, context?: string) => void;
}

const NotificationContext = createContext<NotificationContext>({
  queue: [],
  dismiss: () => {},
  success: () => {},
  error: () => {},
  clear: () => {},
  info: () => {},
});

const useNotificationContext = () => useContext(NotificationContext);

let notificationId = 1000;
function getId() {
  notificationId = notificationId + 1;
  return Math.random() * notificationId;
}

function NotificationProvider(props: PropsWithChildren<{}>) {
  const [queue, setQueue] = useState<Notification[]>([]);

  const newNotification = (payload: Omit<Notification, "id">) => {
    const id = getId();
    const notification = { ...payload, id };
    setQueue((queue) => [...queue, notification]);
    setTimeout(() => {
      setQueue((queue) => queue.filter((n) => n.id !== id));
    }, notification.timeout || 5000);
  };

  const success = (message: string, context?: string) => {
    newNotification({ type: "success", message, context });
  };
  const error = (message: string, context?: string) => {
    newNotification({ type: "error", message, context });
  };
  const info = (message: string, context?: string) => {
    newNotification({ type: "info", message, context });
  };
  const dismiss = (id: number) => {
    setQueue((queue) => queue.filter((n) => n.id !== id));
  };
  const clear = () => {
    setQueue([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        queue,
        dismiss,
        clear,
        error,
        success,
        info,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
}

function NotificationContainer() {
  const { queue, dismiss, clear } = useContext(NotificationContext);
  if (!queue || queue.length == 0) return null;
  return (
    <div
      className="fixed top-0 right-0 flex flex-col items-end w-full max-w-md gap-2 p-4"
      style={{ zIndex: 9999 }}
    >
      {queue.map((notification) => (
        <button
          onClick={() => dismiss(notification.id)}
          // alert-info alert-success alert-error -- tailwind
          className={`alert alert-${notification.type}`}
          key={notification.id}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{notification.message}</span>
        </button>
      ))}

      <button onClick={() => clear()} className="btn btn-ghost btn-sm">
        Clear
      </button>
    </div>
  );
}

export { NotificationContainer, useNotificationContext };
export default NotificationProvider;
