import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Users from './pages/Users.jsx';
import UserProfile from './pages/UserProfile.jsx';
import { UsersProvider } from './context/UsersContext.jsx';

const App = () => {
  return (
    <UsersProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </div>
    </UsersProvider>
  );
};

export default App;
