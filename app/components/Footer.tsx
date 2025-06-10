export default function Footer() {
  return (
    <footer className="bg-black/80 bg-opacity-60 text-white text-center py-6 mt-2">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} DVRN Music Portfolio. All rights reserved.</p>
        <p className="text-xs mt-1">Designed by DVRN Music</p>
      </div>
    </footer>
  );
}