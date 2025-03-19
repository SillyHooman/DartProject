'use client';

import React, { useState } from 'react';

interface Player {
  id: string;
  name: string;
  score: number;
  history: number[];
}

interface Game501Props {
  players: Player[];
  onGameEnd: (winner: Player) => void;
}

export default function Game501({ players, onGameEnd }: Game501Props) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentThrow, setCurrentThrow] = useState<number | null>(null);
  const [throwsRemaining, setThrowsRemaining] = useState(3);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1);

  const handleThrow = (points: number) => {
    if (gameState !== 'playing') return;

    const currentPlayer = players[currentPlayerIndex];
    const multipliedPoints = points * multiplier;
    const newScore = currentPlayer.score - multipliedPoints;

    // Check for bust (going below 0 or not finishing on a double)
    if (newScore < 0 || (newScore === 0 && multiplier !== 2)) {
      // Reset to previous score and move to next player
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      setThrowsRemaining(3);
      setCurrentThrow(null);
      setMultiplier(1);
      return;
    }

    // Update player's score
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = {
      ...currentPlayer,
      score: newScore,
      history: [...currentPlayer.history, multipliedPoints],
    };

    // Check for game end
    if (newScore === 0) {
      setGameState('finished');
      onGameEnd(updatedPlayers[currentPlayerIndex]);
      return;
    }

    // Move to next throw or player
    if (throwsRemaining === 1) {
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      setThrowsRemaining(3);
      setCurrentThrow(null);
      setMultiplier(1);
    } else {
      setThrowsRemaining(prev => prev - 1);
      setCurrentThrow(null);
      setMultiplier(1);
    }
  };

  const handleMultiplierClick = (newMultiplier: 1 | 2 | 3) => {
    setMultiplier(newMultiplier);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Player Scores */}
        <div className="space-y-4">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`p-4 rounded-lg ${
                index === currentPlayerIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-white'
              }`}
            >
              <h3 className="text-xl font-bold">{player.name}</h3>
              <p className="text-3xl font-mono">{player.score}</p>
              <div className="mt-2 text-sm">
                Last throws: {player.history.slice(-3).join(', ')}
              </div>
            </div>
          ))}
        </div>

        {/* Dart Board */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Current Turn</h2>
          <p className="text-white mb-4">
            Throws remaining: {throwsRemaining}
          </p>

          {/* Multiplier Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => handleMultiplierClick(1)}
              className={`px-4 py-2 rounded-lg ${
                multiplier === 1 ? 'bg-blue-600' : 'bg-gray-700'
              } text-white`}
            >
              Single
            </button>
            <button
              onClick={() => handleMultiplierClick(2)}
              className={`px-4 py-2 rounded-lg ${
                multiplier === 2 ? 'bg-blue-600' : 'bg-gray-700'
              } text-white`}
            >
              Double
            </button>
            <button
              onClick={() => handleMultiplierClick(3)}
              className={`px-4 py-2 rounded-lg ${
                multiplier === 3 ? 'bg-blue-600' : 'bg-gray-700'
              } text-white`}
            >
              Triple
            </button>
          </div>

          {/* Dart Board Numbers */}
          <div className="grid grid-cols-3 gap-2">
            {[20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5].map((number) => (
              <button
                key={number}
                onClick={() => handleThrow(number)}
                disabled={gameState !== 'playing'}
                className="aspect-square bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center font-bold"
              >
                {number}
              </button>
            ))}
          </div>

          {/* Bull */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => handleThrow(25)}
              disabled={gameState !== 'playing'}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold"
            >
              Outer Bull (25)
            </button>
            <button
              onClick={() => handleThrow(50)}
              disabled={gameState !== 'playing'}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold"
            >
              Bullseye (50)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 