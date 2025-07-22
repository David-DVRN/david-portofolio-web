'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/upload');
    } else {
      setError('Kata sandi salah');
    }
  };

  return (
    <div
      className="relative h-screen overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('backgrounds/DVRN Web Backgroun login.jpg')", // GANTI ini sesuai nama file kamu di /public
      }}
    >
      {/* Overlay gelap agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Form login */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 space-y-4 bg-white/10 backdrop-blur-md p-8 rounded-lg text-white"
      >
        <h1 className="text-xl font-bold">Login</h1>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-800 border border-white"
          placeholder="Masukkan kata sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}
