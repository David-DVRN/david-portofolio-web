'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FormState = {
  name: string;
  genre: string;
  bpm: string;
  imageFile: File | null;
  audioFile: File | null;
};

type Music = {
  id: number;
  name: string;
  genre: string;
  bpm: number;
  cover_url: string;
  audio_url: string;
};

export default function UploadPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: '',
    genre: '',
    bpm: '',
    imageFile: null,
    audioFile: null,
  });

  const [tracks, setTracks] = useState<Music[]>([]);

  useEffect(() => {
    fetch('/api/tracks')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const text = await res.text();
        if (!text) return []; // atau return default []

        try {
          return JSON.parse(text);
        } catch (e) {
          console.error('JSON parse error:', e);
          return []; // fallback jika tidak bisa di-parse
        }
      })
      .then((data) => setTracks(data))
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0] && (name === 'imageFile' || name === 'audioFile')) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.imageFile || !form.audioFile) {
      alert('Please upload both image and audio files!');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('genre', form.genre);
    formData.append('bpm', form.bpm);
    formData.append('cover', form.imageFile);
    formData.append('audio', form.audioFile);

    const res = await fetch('/api/tracks', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Uploaded!');
      const newTrack = await res.json();
      setTracks((prev) => [...prev, newTrack]);
    } else {
      alert('Upload failed!');
    }
  };

  const handleDelete = async (id: number) => {
    const answer = prompt('Ketik "Hapus" untuk konfirmasi:');
    if (answer === 'Hapus') {
      const res = await fetch(`/api/tracks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTracks((prev) => prev.filter((t) => t.id !== id));
        alert('Terhapus!');
      } else {
        alert('Hapus gagal');
      }
    } else {
      alert('Kata kunci salah');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
    router.push('/login');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center bg-no-repeat p-4 space-y-10"
      style={{
        backgroundImage: "url('backgrounds/DVRN Web Background 1.jpg')",
      }}
    >
      {/* Tombol Logout */}
      <div className="w-full max-w-2xl flex justify-end mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-1 rounded transition"
        >
          Logout
        </button>
      </div>

      {/* Upload Form */}
      <div className="max-w-2xl bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg text-white">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full bg-white/20 text-white placeholder-white p-2 rounded"
          />
          <input
            type="text"
            placeholder="Genre"
            onChange={(e) => setForm((prev) => ({ ...prev, genre: e.target.value }))}
            className="w-full bg-white/20 text-white placeholder-white p-2 rounded"
          />
          <input
            type="number"
            placeholder="BPM"
            onChange={(e) => setForm((prev) => ({ ...prev, bpm: e.target.value }))}
            className="w-full bg-white/20 text-white placeholder-white p-2 rounded"
          />

          <div className="flex items-center gap-4">
            <label htmlFor="imageFile" className="w-32 text-white">Upload Cover:</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="flex-1 bg-white/20 text-white file:bg-blue-500 file:text-white file:px-2 file:py-1 file:rounded"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="audioFile" className="w-32 text-white">Upload Audio:</label>
            <input
              type="file"
              id="audioFile"
              name="audioFile"
              accept="audio/*"
              onChange={handleFileChange}
              className="flex-1 bg-white/20 text-white file:bg-blue-500 file:text-white file:px-2 file:py-1 file:rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Upload
          </button>
        </form>
      </div>

      {/* Track List */}
      <ul className="max-w-2xl w-full text-white space-y-3">
        {tracks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-white/10 p-3 rounded shadow"
          >
            <span>{t.name} – {t.genre}</span>
            <button
              onClick={() => handleDelete(t.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-1 rounded transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}