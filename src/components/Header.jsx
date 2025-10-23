import React, { useEffect, useState } from 'react';
import { User, Bell, Headset } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // check initial position
    setScrolled(window.scrollY > 10);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'backdrop-blur-sm bg-white/60 border-b border-gray-200 shadow-sm' : 'bg-white border-b border-gray-200 shadow-sm'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center h-16">
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
