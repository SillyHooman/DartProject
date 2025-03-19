'use client';

import React, { useState } from 'react';

interface Player {
  id: string;
  name: string;
  score: number;
  history: number[];
}

interface CricketNumber {
  value: number;
  hits: number;
  closed: boolean;
}

interface GameCricketProps {
  players: Player[];
  onGameEnd: (winner: Player) => void;
}

export default function GameCricket({ players, onGameEnd }: GameCricketProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [throwsRemaining, setThrowsRemaining] = useState(3);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [numbers, setNumbers] = useState<CricketNumber[]>([
    { value: 15, hits: 0, closed: false },
    { value: 16, hits: 0, closed: false },
    { value: 17, hits: 0, closed: false },
    { value: 18, hits: 0, closed: false },
    { value: 19, hits: 0, closed: false },
    { value: 20, hits: 0, closed: false },
    { value: 25, hits: 0, closed: false }, // Bullseye
  ]);

  const handleThrow = (points: number) => {
    if (gameState !== 'playing') return;

    const currentPlayer = players[currentPlayerIndex];
    const numberIndex = numbers.findIndex(n => n.value === points);
    
    if (numberIndex === -1) {
      // Invalid number for Cricket
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      setThrowsRemaining(3);
      return;
    }

    const updatedNumbers = [...numbers];
    const number = updatedNumbers[numberIndex];
    
    if (!number.closed) {
      number.hits += 1;
      if (number.hits >= 3) {
        number.closed = true;
      }
    }

    // Check if all numbers are closed
    const allClosed = updatedNumbers.every(n => n.closed);
    if (allClosed) {
      setGameState('finished');
      onGameEnd(currentPlayer);
      return;
    }

    setNumbers(updatedNumbers);

    // Move to next throw or player
    if (throwsRemaining === 1) {
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      setThrowsRemaining(3);
    } else {
      setThrowsRemaining(prev => prev - 1);
    }
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

        {/* Cricket Numbers */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Cricket Numbers</h2>
          <div className="grid grid-cols-2 gap-4">
            {numbers.map((number) => (
              <div
                key={number.value}
                className={`p-4 rounded-lg ${
                  number.closed ? 'bg-green-600' : 'bg-gray-700'
                } text-white`}
              >
                <div className="text-xl font-bold">
                  {number.value === 25 ? 'Bull' : number.value}
                </div>
                <div className="text-sm">
                  Hits: {number.hits}/3
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dart Board */}
      <div className="mt-6">
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
  );
} 