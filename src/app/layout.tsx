import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Darts Tracker',
  description: 'Track your darts games and improve your game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        {children}
      </body>
    </html>
  );
} 