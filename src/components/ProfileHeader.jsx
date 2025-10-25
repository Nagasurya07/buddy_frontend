import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Edit2, Copy, Check } from 'lucide-react';

const ProfileHeader = ({ selectedUser, handleCopyEmail, copiedEmail }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [showEditHint, setShowEditHint] = useState(false);

  // Avatar upload handlers (moved from UserProfile.jsx)
  const fileInputRef = useRef(null);
  const hintTimeoutRef = useRef(null);
  const triggerEditPop = () => {
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    setShowEditHint(true);
    hintTimeoutRef.current = setTimeout(() => setShowEditHint(false), 1500);
  };
  const handleAvatarClick = () => triggerEditPop();
  const handleAvatarMouseDown = (e) => {
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
      if (avatarUrl && avatarUrl.startsWith('blob:')) URL.revokeObjectURL(avatarUrl);
    };
  }, [avatarUrl]);

  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
  }, []);

  return (
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
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          {/* subtle vertical separator to give a small separation feel */}
          <div aria-hidden="true" className="w-px h-16 rounded bg-gradient-to-b from-transparent via-slate-300/30 to-transparent mx-2" />

          {/* Name, email and phone (shaded) */}
          <div className="rounded-md bg-gray-50 p-3">
            {/* Name, email and phone (with silver shade overlay) */}
            <div className="relative rounded-md">
              {/* translucent silver shade behind this block only (silver tone) */}
              <span aria-hidden="true" className="absolute inset-0 rounded-md bg-slate-200/12 pointer-events-none" />

              <div className="relative z-10">
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
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
