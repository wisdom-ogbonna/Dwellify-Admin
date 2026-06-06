/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [pendingCount, setPendingCount] = useState(0);

  return (
    <NotificationContext.Provider value={{ pendingCount, setPendingCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
