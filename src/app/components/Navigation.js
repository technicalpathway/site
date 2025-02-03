'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-800 p-2 border-b border-gray-700">
      <div className="px-2 mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-semibold text-white hover:opacity-90">
            Technical<span className="text-indigo-500">Pathways</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className={`transition-colors flex items-center space-x-2 ${
                pathname === '/dashboard' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/ide" 
              className={`transition-colors flex items-center space-x-2 ${
                pathname === '/ide' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>IDE Testing <span className="bg-indigo-700 text-white px-2 py-1 rounded-md text-xs">DEVELOPER</span></span>
            </Link>
            <Link 
              href="/developer/flags" 
              className={`transition-colors flex items-center space-x-2 ${
                pathname === '/developer/flags' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Flags <span className="bg-indigo-700 text-white px-2 py-1 rounded-md text-xs">DEVELOPER</span></span>
            </Link>
            <Link 
              href="/developer/flags" 
              className={`transition-colors flex items-center space-x-2 ${
                pathname === '/developer/flags' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Content Editor <span className="bg-indigo-700 text-white px-2 py-1 rounded-md text-xs">DEVELOPER</span></span>
            </Link>
          </nav>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
          <UserIcon className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
} 