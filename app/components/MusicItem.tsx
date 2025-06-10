// components/MusicItem.tsx
import Image from 'next/image';
import { useRef } from 'react';
import AudioVisualizer from './AudioVisualizer';
import { Music } from '@/types/music'; // sesuaikan dengan path

export default function MusicItem({ music }: { music: Music }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="relative p-4 border border-white/10 rounded overflow-hidden">
      {/* Background blur image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={music.image_url}
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          className="blur-sm opacity-80"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-start gap-4">
        {/* Cover Image */}
        <div className="flex-shrink-0">
          <Image
            src={music.image_url}
            alt={music.name}
            width={150}
            height={150}
            className="rounded"
          />
        </div>

        {/* Info + Visualizer + Audio */}
        <div className="flex flex-col flex-1 w-full">
          {/* Info */}
          <h2 className="text-xl text-white">{music.name}</h2>
          <p className="text-gray-300">{music.genre}</p>
          <p className="text-gray-300">{music.bpm} BPM</p>

          {/* Audio Visualizer */}
          <div className="mt-4">
            <AudioVisualizer audioRef={audioRef} />
          </div>

          {/* Audio Player full width */}
          <audio ref={audioRef} controls className="mt-2 w-full">
            <source src={music.audio_url} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}
