import React, { createContext, useContext, useState } from "react";

interface Notification {
  title: string;
  body: string;
  date: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [{ title: "Teste", body: "Teste", date: new Date() }],
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