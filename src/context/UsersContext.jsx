import React, { createContext, useContext, useMemo, useState } from 'react';

const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Dave Richards', email: 'dave@mail.com', contact: '+91 8332883854' },
    { id: 2, name: 'Abhishek Hari', email: 'hari@mail.com', contact: '+91 9876543210' },
    { id: 3, name: 'Nishta Gupta', email: 'nishta@mail.com', contact: '+91 9988776655' },
  ]);

  const addUser = ({ name, email, contact }) => {
    if (!name || !email || !contact) return;
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers(prev => [...prev, { id: nextId, name, email, contact }]);
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const getUserById = (id) => users.find(u => u.id === id) || null;

  const value = useMemo(() => ({ users, addUser, deleteUser, getUserById }), [users]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error('useUsers must be used within a UsersProvider');
  return ctx;
};
