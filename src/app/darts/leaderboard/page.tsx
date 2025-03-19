'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import { useGame } from '../contexts/GameContext';

export default function LeaderboardPage() {
  const { state } = useGame();
  const { currentGame } = state;

  // For now, we'll just show the current game's players
  // In a real app, we'd want to persist games and show history
  const players = currentGame?.players || [];

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h1>

        {players.length === 0 ? (
          <div className="text-center text-gray-600">
            No games played yet. Start a game to see the leaderboard!
          </div>
        ) : (
          <div className="space-y-4">
            {players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-gray-400 w-8">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-700">{player.name}</h3>
                      <p className="text-sm text-gray-500">
                        {player.throws.length} throws
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {player.score}
                    </p>
                    <p className="text-sm text-gray-500">
                      {player.throws.reduce((acc, t) => acc + (t.value * t.multiplier), 0)} points
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Navigation />
    </main>
  );
} 