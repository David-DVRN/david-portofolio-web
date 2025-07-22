import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

type CloudinaryUploadResult = {
  secure_url: string;
  [key: string]: unknown;
};

// Fungsi upload gambar
async function uploadImageToCloudinary(file: File, folder: string): Promise<CloudinaryUploadResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image', // ✅ UNTUK PNG/JPG
        folder,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result as CloudinaryUploadResult);
      }
    ).end(buffer);
  });
}

// Fungsi upload audio
async function uploadAudioToCloudinary(file: File, folder: string): Promise<CloudinaryUploadResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'video', // ✅ UNTUK MP3/WAV
        folder,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result as CloudinaryUploadResult);
      }
    ).end(buffer);
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const coverFile = formData.get('cover') as File;
    const audioFile = formData.get('audio') as File;
    const name = formData.get('name') as string;
    const genre = formData.get('genre') as string;
    const bpm = formData.get('bpm') as string;

    if (!coverFile || !audioFile) {
      return NextResponse.json({ error: 'Missing files' }, { status: 400 });
    }

    // Upload secara paralel
    const [coverResult, audioResult] = await Promise.all([
      uploadImageToCloudinary(coverFile, 'dvrn_file/cover'),
      uploadAudioToCloudinary(audioFile, 'dvrn_file/audio'),
    ]);

    // Simpan ke database
    const created = await prisma.musics.create({
      data: {
        name,
        genre,
        bpm: parseInt(bpm),
        image_url: coverResult.secure_url,
        audio_url: audioResult.secure_url,
      }
    });

return NextResponse.json(created); // ← kirim data lengkap termasuk id


  } catch (error) {
    console.error('Upload or DB Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
export async function GET() {
  try {
    const musics = await prisma.musics.findMany({
      orderBy: { id: 'desc' }, // urutkan sesuai kebutuhan
    });

    return NextResponse.json(musics);
  } catch (error) {
    console.error('DB fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 });
  }
}
