import React, { useEffect, useState, useRef } from 'react';
import { User, Bell, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationsContext.jsx';
import { useLocation } from 'react-router-dom';

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

  const { notifications, unreadCount, markAllRead, clearAll } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const isUsersList = location.pathname === '/users';
  const primaryLogo = 'https://interviewbuddy.net/assests/logos/IBlogo_light.svg';
  const primaryLogoFixed = 'https://interviewbuddy.net/assets/logos/IBlogo_light.svg';
  const oldLogo = 'https://interviewbuddy.net/assests/logos/old-ib-logo.svg';
  const oldLogoFixed = 'https://interviewbuddy.net/assets/logos/old-ib-logo.svg';
  const currentLogoSrc = isUsersList ? oldLogo : primaryLogo;

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
        <div className="flex items-center space-x-2 select-none">
          {/* Brand Logo: old logo on /users, new logo elsewhere */}
          <img
            src={currentLogoSrc}
            alt={isUsersList ? 'InterviewBuddy old logo' : 'InterviewBuddy logo'}
            className="h-8 md:h-9 w-auto"
            onError={(e) => {
              // Fallback to corrected path if provided URL has a typo
              e.currentTarget.onerror = null;
              e.currentTarget.src = isUsersList ? oldLogoFixed : primaryLogoFixed;
            }}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/me" className="p-2 text-gray-700 hover:text-gray-900 transition-colors" aria-label="Support / About Me">
            <Headset size={20} strokeWidth={2} />
          </Link>

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
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="text-sm font-semibold">Notifications</div>
                  <button
                    type="button"
                    className={`text-xs text-gray-600 hover:text-gray-900 ${notifications.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                    onClick={() => notifications.length > 0 && clearAll()}
                    disabled={notifications.length === 0}
                    title={notifications.length === 0 ? 'No notifications' : 'Clear all'}
                  >
                    Clear all
                  </button>
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

          <Link to="/my-profile" className="p-2 bg-purple-100 rounded-full text-purple-600 hover:bg-purple-200 transition-colors" aria-label="My Profile">
            <User size={30} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
