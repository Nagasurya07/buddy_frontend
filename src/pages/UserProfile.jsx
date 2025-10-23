import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Mail, Phone, Edit2, Copy, Check, FileText } from 'lucide-react';
import { useUsers } from '../context/UsersContext.jsx';

const UserProfile = () => {
  const { userId } = useParams();
  const id = Number(userId);
  const { getUserById } = useUsers();
  const selectedUser = getUserById(id);
  const [activeTab, setActiveTab] = useState('basic');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [showEditHint, setShowEditHint] = useState(false);

  // Avatar upload handlers
  const fileInputRef = useRef(null);
  const hintTimeoutRef = useRef(null);
  const triggerEditPop = () => {
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    setShowEditHint(true);
    hintTimeoutRef.current = setTimeout(() => setShowEditHint(false), 1500);
  };
  const handleAvatarClick = () => {
    triggerEditPop();
  };
  const handleAvatarMouseDown = (e) => {
    // prevent default to avoid double-trigger with onClick
    e.preventDefault();
    triggerEditPop();
  };
  const handleAvatarKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerEditPop();
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl((prev) => {
      if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
      return url;
    });
  };
  useEffect(() => {
    return () => {
      if (avatarUrl && avatarUrl.startsWith('blob:')) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);
  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    if (!selectedUser?.email) return;
    try {
      await navigator.clipboard.writeText(selectedUser.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  if (!selectedUser) {
    return (
      <main className="container mx-auto px-6 py-10">
        <div className="bg-white rounded-lg p-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">User not found</h1>
          <p className="text-gray-600 mb-6">We couldn't find a user with ID {userId}.</p>
          <Link className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" to="/users">← Back to Users</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-12 py-10">
  <div className="bg-white rounded-lg overflow-hidden shadow-section-soft">
        {/* Profile header: avatar + name + contact */}
        <div className="relative overflow-hidden px-10 py-7 bg-gradient-to-r from-purple-50/70 to-white">
          {/* decorative arcs on the right to match screenshot */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2">
            <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[980px] h-[980px] rounded-full border border-purple-100/40"></div>
            <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-purple-100/30"></div>
            <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-[660px] h-[660px] rounded-full border border-purple-100/20"></div>
          </div>
          <div className="relative flex items-center gap-6">
            {/* Avatar with double ring (click to upload) */}
            <div className="relative">
              <button
                type="button"
                onMouseDown={handleAvatarMouseDown}
                onKeyDown={handleAvatarKeyDown}
                onClick={handleAvatarClick}
                title="Change avatar"
                aria-label="Change avatar"
                className="group w-28 h-28 rounded-full bg-purple-50 ring-8 ring-purple-50 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <div className="w-28 h-28 rounded-full bg-purple-100 ring-2 ring-white overflow-hidden flex items-center justify-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Profile avatar" className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                {/* Silver shade overlay when edit pops */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-full bg-gray-400/35 transition-opacity ${showEditHint ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
                />
                {/* Center pop-up pencil overlay on click (opens file on click) */}
                <button
                  type="button"
                  aria-label="Edit avatar"
                  onClick={() => fileInputRef.current?.click()}
                  className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-200 ${showEditHint ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-75'}`}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-section-soft ring-1 ring-white/70">
                    <Edit2 size={16} />
                  </span>
                </button>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Name, email and phone */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">{selectedUser?.name}</h1>
              <div className="flex flex-col items-start space-y-1.5 mt-2">
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-700 px-2">{selectedUser?.email}</span>
                  <button type="button" onClick={handleCopyEmail} title={copiedEmail ? 'Copied!' : 'Copy email'} aria-label="Copy email">
                    {copiedEmail ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-700">{selectedUser?.contact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4">
          <div className="flex space-x-1">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'basic' ? 'text-purple-700 bg-purple-100 hover:bg-purple-200' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Info
            </button>
            <button
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'education' ? 'text-purple-700 bg-purple-100 hover:bg-purple-200' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('education')}
            >
              <span>Education & skills</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'experience' ? 'text-purple-700 bg-purple-100 hover:bg-purple-200' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
          </div>
        </div>

        {/* Panels */}
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
                <input type="text" placeholder="e.g. John" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input type="text" placeholder="e.g. Doe" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <input type="email" placeholder="e.g. mrnobody@mail.com" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
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
                  <input type="text" placeholder="8332883854" className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone no</label>
                <input type="text" placeholder="e.g. 9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input type="text" placeholder="Enter here" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
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
                <textarea placeholder="Enter here" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"></textarea>
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
          <div className="px-6 py-6 space-y-6">
            {/* Education details card */}
            <div className="p-6 bg-white rounded-xl shadow-section-soft">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Education Details</h2>
                <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                  <Edit2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School / College</label>
                  <input type="text" placeholder="e.g. Lincoln College" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highest degree or equivalent</label>
                  <input type="text" placeholder="e.g. Bachelors in Technology" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input type="text" placeholder="e.g. Computer science engineering" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
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
                  <input type="text" placeholder="Enter here" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
            </div>

            {/* Skills & Projects card */}
            <div className="p-6 bg-white rounded-xl shadow-section-soft">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Skills & Projects</h3>
                <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                  <Edit2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <textarea placeholder="Enter here" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-36" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
                  <textarea placeholder="Enter here" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-36" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="px-6 py-6 space-y-6">
            {/* Work Experience card (single outer card, no inner borders) */}
            <div className="p-6 bg-white rounded-xl shadow-section-soft">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Work Experience</h2>
                <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                  <Edit2 size={16} />
                </button>
              </div>

              {/* Experience entry 1 */}
              <div className="mb-8">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                  <input type="text" placeholder="e.g. Technology" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-4 ml-3 pl-4 border-l border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-domain</label>
                    <input type="text" placeholder="e.g. MERN Stack" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
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

              {/* Experience entry 2 */}
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                  <input type="text" placeholder="e.g. Technology" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-4 ml-3 pl-4 border-l border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-domain</label>
                    <input type="text" placeholder="e.g. MERN Stack" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
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
            </div>

            {/* LinkedIn and Resume section */}
            <div className="grid grid-cols-2 gap-6">
              {/* LinkedIn card */}
              <div className="p-4 rounded-lg shadow-section-soft bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">LinkedIn</h3>
                  <button className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition-colors">
                    <Edit2 size={16} />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile URL</label>
                  <input type="text" placeholder="linkedin.com/in/mrbean" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>

              {/* Resume card */}
              <div className="relative p-6 rounded-xl shadow-section-soft bg-white">
                <h3 className="text-lg font-semibold text-gray-800">Resume</h3>
                <button
                  className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                  title="Edit resume"
                  type="button"
                >
                  <Edit2 size={16} />
                </button>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText size={20} className="text-purple-600" />
                    <span className="text-sm text-gray-700">myresume.pdf</span>
                  </div>
                  <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm hover:bg-purple-100 transition-colors">View</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back button to users list */}
      <div className="mt-6">
        <Link className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" to="/users">← Back to Users</Link>
      </div>
    </main>
  );
};

export default UserProfile;
