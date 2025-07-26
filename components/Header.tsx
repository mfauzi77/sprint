import React, { useState, useEffect, useRef } from 'react';
import { UserCircleIcon, ArrowLeftOnRectangleIcon, CalendarIcon } from './icons/Icons';

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, onLogout }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10 border-b border-slate-200">
      <div className="flex items-center">
         <button onClick={() => setIsSidebarOpen(true)} className="text-slate-500 mr-4 lg:hidden" aria-label="Open sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-800">SPRINT (Sistem Prediktif Responsif Terintegrasi)</h1>
          <p className="text-xs sm:text-sm text-slate-500">Sistem Prediktif Responsif Terintegrasi untuk Pengembangan Anak Usia Dini Holistik Integratif</p>
          <div className="flex items-center text-xs text-slate-500 font-medium mt-1.5">
            <CalendarIcon className="w-4 h-4 mr-1.5 text-slate-400" />
            <span>Data diproses per 30 Juni 2024</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="relative">
            <button className="relative" aria-label="Notifications">
                <span className="absolute -top-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 hover:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </button>
        </div>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center" aria-expanded={isProfileMenuOpen} aria-haspopup="true">
            <img
              src="https://picsum.photos/id/64/200/200"
              alt="User Avatar"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-offset-2 ring-transparent group-hover:ring-indigo-500 transition-all"
            />
            <div className="ml-2 md:ml-3 text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">Dr. Siti Rahman</p>
              <p className="text-xs text-slate-500">Koordinator Regional</p>
            </div>
          </button>
          
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                <UserCircleIcon className="w-5 h-5 mr-2 text-gray-500"/>
                Profil
              </a>
              <button
                onClick={onLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2 text-red-500" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;