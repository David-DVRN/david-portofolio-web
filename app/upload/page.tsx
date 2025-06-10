'use client';

import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

// Tipe eksplisit untuk state form agar TypeScript tidak error
type FormState = {
  name: string;
  genre: string;
  bpm: string;
  imageFile: File | null;
  audioFile: File | null;
};

export default function UploadPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    genre: '',
    bpm: '',
    imageFile: null,
    audioFile: null,
  });

  // Hanya boleh menerima file dengan name imageFile / audioFile
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    // Validasi agar name sesuai dengan field yang ada di form
    if (
      files &&
      files[0] &&
      (name === 'imageFile' || name === 'audioFile')
    ) {
      // Gunakan name sebagai key untuk update state
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi kalau file belum diisi
    if (!form.imageFile || !form.audioFile) {
      alert('Please upload both image and audio files!');
      return;
    }

    // Membuat reference unik di Firebase Storage untuk masing-masing file
    const imageRef = ref(
      storage,
      `images/${uuidv4()}_${form.imageFile.name}`
    );
    const audioRef = ref(
      storage,
      `audio/${uuidv4()}_${form.audioFile.name}`
    );

    // Upload file ke Firebase Storage
    const imageSnapshot = await uploadBytes(imageRef, form.imageFile);
    const audioSnapshot = await uploadBytes(audioRef, form.audioFile);

    // Ambil URL dari file yang sudah diupload
    const imageURL = await getDownloadURL(imageSnapshot.ref);
    const audioURL = await getDownloadURL(audioSnapshot.ref);

    // Kirim data ke API kamu
    await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        genre: form.genre,
        bpm: form.bpm,
        image_url: imageURL,
        audio_url: audioURL,
      }),
    });

    alert('Uploaded!');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: "url('backgrounds/DVRN Web Background 1.jpg')",
      }}
    >
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

          {/* Input untuk image */}
          <div className="flex items-center gap-4">
            <label htmlFor="imageFile" className="w-32 text-white">
              Upload Cover:
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="flex-1 bg-white/20 text-white file:bg-blue-500 file:text-white file:px-2 file:py-1 file:rounded"
            />
          </div>

          {/* Input untuk audio */}
          <div className="flex items-center gap-4">
            <label htmlFor="audioFile" className="w-32 text-white">
              Upload Audio:
            </label>
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
    </div>
  );
}
