'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from './contexts/GameContext';
import Navigation from './components/Navigation';
import PlayerSetup from './components/PlayerSetup';
import { GameType, Player } from './types/game';

const HomePage = () => {
  const router = useRouter();
  const { dispatch } = useGame();
  const [selectedType, setSelectedType] = useState<GameType | null>(null);
  const [startingScore, setStartingScore] = useState(501);

  const handleGameTypeSelect = (type: GameType) => {
    setSelectedType(type);
  };

  const handleStartGame = (players: Player[]) => {
    dispatch({
      type: 'START_GAME',
      payload: {
        type: selectedType!,
        players,
        startingScore: selectedType === GameType.Countdown ? startingScore : undefined,
      },
    });
    router.push('/darts/game');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Select Game Type</h1>

        {!selectedType ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleGameTypeSelect(GameType.Countdown)}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Countdown</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Classic darts game where players start with a score and try to reach exactly zero.
              </p>
            </button>

            <button
              onClick={() => handleGameTypeSelect(GameType.Cricket)}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cricket</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Hit numbers 15-20 and bullseye three times each to close them and win.
              </p>
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            {selectedType === GameType.Countdown && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Starting Score
                </label>
                <select
                  value={startingScore}
                  onChange={(e) => setStartingScore(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={401}>401</option>
                  <option value={501}>501</option>
                  <option value={601}>601</option>
                  <option value={701}>701</option>
                  <option value={1001}>1001</option>
                </select>
              </div>
            )}
            <PlayerSetup onStart={handleStartGame} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 