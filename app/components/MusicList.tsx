'use client';

import MusicItem from './MusicItem'; // Atau '../MusicItem' tergantung lokasi file
import { Music } from '../types/music'; // sesuaikan dengan path



export default function MusicList({ musics }: { musics: Music[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {musics.map((music) => (
        <MusicItem key={music.id} music={music} />
      ))}
    </div>
  );
}
