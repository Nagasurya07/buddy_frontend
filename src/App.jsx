import React, { useState } from 'react';
import { Eye, Trash2, User, Bell, Headset, X, Mail, Phone, Edit2 } from 'lucide-react';

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Dave Richards', email: 'dave@mail.com', contact: '+91 8332883854' },
    { id: 2, name: 'Abhishek Hari', email: 'hari@mail.com', contact: '+91 9876543210' },
    { id: 3, name: 'Nishta Gupta', email: 'nishta@mail.com', contact: '+91 9988776655' }
  ]);
  
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'education', 'experience'
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.contact) {
      const newUserObj = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        contact: newUser.contact
      };
      setUsers([...users, newUserObj]);
      setNewUser({ name: '', email: '', contact: '' });
      setShowAddUserForm(false);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserProfile(true);
    setActiveTab('basic');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Brand Logo */}
            <div className="flex flex-col items-center select-none">
              <div className="border-2 border-black px-4 py-1">
                <span className="text-black font-extrabold tracking-tight text-xl">
                  LOGO
                </span>
              </div>
              <div className="mt-1 text-[8px] leading-tight text-black text-center">
                <div className="font-medium">ESTD</div>
                <div className="font-semibold">2025</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors" aria-label="Support">
              <Headset size={20} strokeWidth={2} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 bg-purple-100 rounded-full text-purple-600 hover:bg-purple-200 transition-colors">
              <User size={30} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {showUserProfile ? (
        // User Profile View
        <main className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* User Header */}
            <div className="px-6 py-6 bg-gradient-to-r from-purple-50 to-white border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{selectedUser?.name}</h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-1" />
                      {selectedUser?.email}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-1" />
                      {selectedUser?.contact}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex space-x-1">
                <button 
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'basic' ? 'text-purple-700 bg-purple-100 hover:bg-purple-200' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Info
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'education' ? 'text-purple-700 bg-purple-100 hover:bg-purple-200' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setActiveTab('education')}
                >
                  Education & Skills
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'experience' ? 'text-purple-700 bg-purple-100 hover:bg-purple-200' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setActiveTab('experience')}
                >
                  Experience
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'basic' && (
              <div className="px-6 py-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Basic Details</h2>
                  <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                    <Edit2 size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input
                      type="text"
                      placeholder="e.g. John"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input
                      type="text"
                      placeholder="e.g. Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                    <input
                      type="email"
                      placeholder="e.g. mrnobody@mail.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of birth</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>YYYY</option>
                      <option>1990</option>
                      <option>1991</option>
                      <option>1992</option>
                      <option>1993</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Select an option</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                    <div className="flex">
                      <select className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>🇮🇳 +91</option>
                        <option>🇺🇸 +1</option>
                        <option>🇬🇧 +44</option>
                      </select>
                      <input
                        type="text"
                        placeholder="8332883854"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone no</label>
                    <input
                      type="text"
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domicile state</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Select an option</option>
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                      <option>Delhi</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domicile country</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Select an option</option>
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="px-6 py-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Education Details</h2>
                  <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                    <Edit2 size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School / College</label>
                    <input
                      type="text"
                      placeholder="e.g. Lincoln College"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest degree or equivalent</label>
                    <input
                      type="text"
                      placeholder="e.g. Bachelors in Technology"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <input
                      type="text"
                      placeholder="e.g. Computer science engineering"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of completion</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>YYYY</option>
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                      <option>2020</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="px-6 py-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Work Experience</h2>
                  <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                    <Edit2 size={16} />
                  </button>
                </div>
                
                {/* First Experience Entry */}
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                    <input
                      type="text"
                      placeholder="e.g. Technology"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sub-domain</label>
                      <input
                        type="text"
                        placeholder="e.g. MERN Stack"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>Select an option</option>
                        <option>Less than 1 year</option>
                        <option>1-2 years</option>
                        <option>2-5 years</option>
                        <option>5+ years</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Second Experience Entry */}
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                    <input
                      type="text"
                      placeholder="e.g. Technology"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sub-domain</label>
                      <input
                        type="text"
                        placeholder="e.g. MERN Stack"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>Select an option</option>
                        <option>Less than 1 year</option>
                        <option>1-2 years</option>
                        <option>2-5 years</option>
                        <option>5+ years</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* LinkedIn and Resume Section */}
                <div className="grid grid-cols-2 gap-6">
                  {/* LinkedIn Section */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">LinkedIn</h3>
                      <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                        <Edit2 size={16} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile URL</label>
                      <input
                        type="text"
                        placeholder="linkedin.com/in/mrbean"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Resume Section */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Resume</h3>
                      <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                        <Edit2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-purple-600">
                          <path d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm12 1a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1h12z"/>
                          <path d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm12 1a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1h12z"/>
                        </svg>
                        <span className="text-sm text-gray-700">myresume.pdf</span>
                      </div>
                      <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-md text-sm hover:bg-purple-200 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Back button */}
          <div className="mt-6">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              onClick={() => setShowUserProfile(false)}
            >
              ← Back to Users
            </button>
          </div>
        </main>
      ) : (
        // Users List View
        <main className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Users</h2>
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
                onClick={() => setShowAddUserForm(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
                </svg>
                <span>Add user</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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
                          <button 
                            className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                            onClick={() => handleDeleteUser(user.id)}
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
        </main>
      )}

      {/* Add User Sidebar */}
      {showAddUserForm && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowAddUserForm(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="relative w-96 bg-white shadow-xl h-full ml-auto transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Add User</h2>
                <button 
                  className="text-gray-400 hover:text-gray-600 p-1"
                  onClick={() => setShowAddUserForm(false)}
                >
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
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      placeholder="Type here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={newUser.contact}
                      onChange={(e) => setNewUser({...newUser, contact: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-6 bg-white">
                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={() => setShowAddUserForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={handleAddUser}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
