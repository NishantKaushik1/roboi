import { Barlow } from 'next/font/google';
import '../styles/globals.css';

import Header from '@/components/layout/Header';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Roboi - Real-time Analytics Dashboard',
  description: 'Video Analytics · 7,000+ Pumps · Real-time AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${barlow.className} flex h-screen flex-col overflow-hidden bg-gray-50 dark:bg-gray-950`}>
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
