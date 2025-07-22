import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Music Portfolio',
  description: 'A music showcase by DVRN',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">
        <Header />
        <main className="pt-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
