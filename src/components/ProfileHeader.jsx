import React from 'react';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import ElementsSVG from '../assets/elements.svg';

const ProfileHeader = ({ selectedUser, handleCopyEmail, copiedEmail }) => {

  return (
    <>
      {/* Profile header: avatar + name + contact */}
      <div className="relative overflow-hidden px-10 py-7 bg-gradient-to-r from-purple-50/70 to-white">
        {/* decorative arcs on the right to match screenshot */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2">
          <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[1280px] h-[1280px] rounded-full border border-purple-100/40"></div>
          <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-purple-100/30"></div>
          <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-[660px] h-[660px] rounded-full border border-purple-100/20"></div>
        </div>
        <div className="relative flex items-center gap-6">
          {/* Avatar SVG */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-purple-100 ring-8 ring-purple-50 flex items-center justify-center">
              <img src={ElementsSVG} alt="Profile avatar" className="w-22 h-22" />
            </div>
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
    </>
  );
};

export default ProfileHeader;
