import React from 'react';
import { User, Bell, Headset } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Brand Logo */}
          <div className="flex flex-col items-center select-none">
            <div className="border-2 border-black px-4 py-1">
              <span className="text-black font-extrabold tracking-tight text-xl">LOGO</span>
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
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <button className="p-2 bg-purple-100 rounded-full text-purple-600 hover:bg-purple-200 transition-colors" aria-label="Account">
            <User size={30} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
