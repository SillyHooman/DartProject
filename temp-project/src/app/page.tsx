'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Darts Game</h1>
        <div className="space-y-4">
          <Link 
            href="/games/501"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            501 Darts
          </Link>
          <Link 
            href="/games/cricket"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Cricket
          </Link>
          <Link 
            href="/games/around-the-world"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Around the World
          </Link>
          <Link 
            href="/games/custom"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Custom Game
          </Link>
        </div>
      </div>
    </main>
  );
}
