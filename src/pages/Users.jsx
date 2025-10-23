import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext.jsx';
import AddUserDrawer from '../components/AddUserDrawer.jsx';
import { useUsers } from '../context/UsersContext.jsx';

const Users = () => {
  const { users, deleteUser } = useUsers();
  const { addNotification } = useNotifications();
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <main className="container mx-auto px-6 py-8">
  <div className="bg-white rounded-lg overflow-hidden shadow-section-soft">
        {/* Table header: title + Add user */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Users</h2>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
            onClick={() => setOpenAdd(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            <span>Add user</span>
          </button>
        </div>

        {/* Users table: rows mapped from users */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/users/${user.id}`}
                        className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
                        title="View"
                        onClick={() => addNotification({ title: `Opened ${user.name}`, body: `Viewed profile of ${user.name}` })}
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                        onClick={() => {
                          deleteUser(user.id);
                          addNotification({ title: `${user.name} deleted`, body: `User ${user.name} was removed`, type: 'warning' });
                        }}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserDrawer isOpen={openAdd} onClose={() => setOpenAdd(false)} />
    </main>
  );
};

export default Users;
