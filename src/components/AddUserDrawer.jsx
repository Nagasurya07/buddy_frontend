import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUsers } from '../context/UsersContext.jsx';

const AddUserDrawer = ({ isOpen, onClose }) => {
  const { addUser } = useUsers();
  const [form, setForm] = useState({ name: '', email: '', contact: '' });

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: '', email: '', contact: '' });
    }
  }, [isOpen]);

  const handleAdd = () => {
    if (!form.name || !form.email || !form.contact) return;
    addUser(form);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      {/* Sidebar */}
      <div className="relative w-full md:w-1/2 bg-white shadow-xl h-full ml-auto transform transition-transform duration-300 ease-in-out">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add User</h2>
            <button className="text-gray-400 hover:text-gray-600 p-1" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name of the user</label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  placeholder="Type here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={form.contact}
                  onChange={(e) => setForm(f => ({ ...f, contact: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-6 bg-white">
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserDrawer;
