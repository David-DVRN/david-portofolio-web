'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const cookies = document.cookie;
    const isLoggedIn = cookies.includes('admin_auth=true');
    setIsAdmin(isLoggedIn);
  }, []);

  return (
    <nav className="flex gap-4">
      <Link href="/">Home</Link>
      {isAdmin ? (
        <Link href="/upload">Upload</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
