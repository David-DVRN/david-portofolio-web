export default function ContactPage() {
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('backgrounds/DVRN Web Background.jpg')" }}
    >
      <div className="max-w-2xl bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">My Contact</h1>

        <p className="mb-2">
          My Instagram:{' '}
          <a
            href="https://www.instagram.com/david_dvrn/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-300 hover:text-blue-400"
          >
            Instagram
          </a>
        </p>

        <p className="mb-2">
          My WhatsApp:{' '}
          <a
            href="https://wa.me/08123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-green-300 hover:text-green-400"
          >
            DVRN Number
          </a>
        </p>

        <p className="mb-2">
          Follow me on SoundCloud:{' '}
          <a
            href="https://soundcloud.com/dvrn2002"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-orange-300 hover:text-orange-400"
          >
            SoundCloud
          </a>
        </p>

        <p>
          Subscribe my YouTube Channel:{' '}
          <a
            href="https://www.youtube.com/@dvrn_music"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-red-300 hover:text-red-400"
          >
            YouTube
          </a>
        </p>
      </div>
    </div>
  );
}
