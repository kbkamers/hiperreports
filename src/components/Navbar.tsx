tsx
 "use client"
 import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full p-4 flex justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold">Hiper Reports</h1>
      <Link href="/dashboard" className="ml-4 text-blue-500 hover:underline">
        Dashboard
      </Link>
    </nav>
  );
};

export default Navbar;