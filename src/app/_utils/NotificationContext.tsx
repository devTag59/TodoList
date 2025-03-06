import React, { createContext, useContext, useState } from "react";

interface Notification {
  title: string;
  body: string;
  date: Date;
}

const NotificationContext = createContext<{
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
}>({
  notifications: [],
  addNotification: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    console.log("Adicionando notificação:", notification); // Depuração
    setNotifications((prev) => [...prev, notification]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);