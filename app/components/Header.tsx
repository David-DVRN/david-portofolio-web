import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black/80 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">DVRN Website</h1>

        <nav className="space-x-6">
          <Link href="/" className="hover:text-gray-300 transition">Home</Link>
          <Link href="/about" className="hover:text-gray-300 transition">About</Link>
          <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
          <Link href="/upload" className="text-white hover:text-gray-300">Upload</Link>
        </nav>
      </div>
    </header>
  );
}
