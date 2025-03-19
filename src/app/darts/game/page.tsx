'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useGame } from '../contexts/GameContext';
import DartBoard from '../components/DartBoard';
import CricketProgress from '../components/CricketProgress';
import Navigation from '../components/Navigation';
import { GameType } from '../types/game';

const GamePage = () => {
  const searchParams = useSearchParams();
  const { state, dispatch } = useGame();
  const currentGame = state.currentGame;

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Game in Progress</h1>
          <button
            onClick={() => window.location.href = '/darts'}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start New Game
          </button>
        </div>
      </div>
    );
  }

  const handleNewGame = () => {
    window.location.href = '/darts';
  };

  const handleCancelGame = () => {
    dispatch({ type: 'END_GAME', payload: { winnerId: '' } });
    window.location.href = '/darts';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentGame.type === GameType.Countdown ? `${currentGame.startingScore} Countdown` : 'Cricket'}
          </h1>
          <div className="space-x-4">
            <button
              onClick={handleNewGame}
              className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded hover:bg-red-700 dark:hover:bg-red-800"
            >
              New Game
            </button>
            <button
              onClick={handleCancelGame}
              className="bg-gray-600 dark:bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Player Scores */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentGame.players.map((player, index) => (
            <div
              key={player.id}
              className={`p-4 rounded-lg shadow-lg ${
                index === currentGame.currentPlayerIndex
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {player.name}
                {index === currentGame.currentPlayerIndex && (
                  <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">(Current)</span>
                )}
              </div>
              {currentGame.type === GameType.Countdown && (
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {player.score}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cricket Progress */}
        {currentGame.type === 'Cricket' && <CricketProgress />}

        {/* Dartboard */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <DartBoard />
        </div>
      </div>
    </div>
  );
};

export default GamePage; 