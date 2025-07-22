import { prisma } from '@/lib/prisma';
import MusicList from './components/MusicList';

export default async function HomePage() {
  const musics = await prisma.musics.findMany({
    select: {
      id: true,
      name: true,
      genre: true,
      bpm: true,
      image_url: true,
      audio_url: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  const safeMusics = musics.map((item) => ({
    id: item.id,
    name: item.name ?? '',
    genre: item.genre ?? '',
    bpm: item.bpm ?? 0,
    image_url: item.image_url ?? '',
    audio_url: item.audio_url ?? '',
  }));

  return (
    <div
      className="min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/DVRN Web Background.jpg')" }}
    >
      <main className="backdrop-blur-sm bg-black/10 min-h-screen p-8 text-white">
        <MusicList musics={safeMusics} />
      </main>
    </div>
  );
}