import React, { createContext, useContext, useMemo, useState } from 'react';

const NotificationsContext = createContext(null);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = ({ title, body, type = 'info' }) => {
    const id = Date.now();
    setNotifications(prev => [{ id, title, body, type, read: false, createdAt: new Date() }, ...prev]);
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const clearAll = () => setNotifications([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = useMemo(() => ({ notifications, addNotification, markAllRead, markRead, clearAll, unreadCount }), [notifications]);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
};
