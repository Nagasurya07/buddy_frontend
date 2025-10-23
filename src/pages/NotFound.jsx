import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container mx-auto px-6 md:px-12 py-14">
      <div className="bg-white rounded-lg shadow-section-soft overflow-hidden">
        <div className="relative overflow-hidden px-10 py-12 bg-gradient-to-r from-purple-50/70 to-white">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2">
            <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[980px] h-[980px] rounded-full border border-purple-100/40" />
            <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-purple-100/30" />
            <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-[660px] h-[660px] rounded-full border border-purple-100/20" />
          </div>
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">404 — Page not found</h1>
            <p className="mt-3 text-gray-700 max-w-2xl">
              "I didn't leave this page blank by accident. This page was not designed because I am not sure whether I can design my own pages or not, so I have just designed the pages just as mentioned in the figma design."
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/users" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">← Back to Users</Link>
              <Link to="/me" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">Go to My Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
