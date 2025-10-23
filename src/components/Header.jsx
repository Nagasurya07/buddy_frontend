import React, { useEffect, useState, useRef } from 'react';
import { User, Bell, Headset } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext.jsx';

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

  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
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

          <div ref={ref} className="relative">
            <button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
              aria-label="Notifications"
              onClick={() => { setOpen(o => !o); if (!open) markAllRead(); }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full">{unreadCount}</span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="p-3">
                  <div className="text-sm font-semibold">Notifications</div>
                </div>
                <div className="max-h-64 overflow-auto divide-y divide-gray-100">
                  {notifications.length === 0 && <div className="p-3 text-sm text-gray-500">No notifications</div>}
                  {notifications.map(n => (
                    <div key={n.id} className={`p-3 text-sm ${n.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      <div className="text-sm">{n.title}</div>
                      {n.body && <div className="text-xs text-gray-500">{n.body}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="p-2 bg-purple-100 rounded-full text-purple-600 hover:bg-purple-200 transition-colors" aria-label="Account">
            <User size={30} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
