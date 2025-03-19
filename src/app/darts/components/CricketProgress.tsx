'use client';

import React from 'react';
import { useGame } from '../contexts/GameContext';

const CricketProgress = () => {
  const { state } = useGame();
  const currentGame = state.currentGame;
  if (!currentGame || currentGame.type !== 'Cricket') return null;

  const currentPlayer = currentGame.players[currentGame.currentPlayerIndex];
  const requiredNumbers = [15, 16, 17, 18, 19, 20, 25]; // 25 is bullseye

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cricket Progress</h3>
      <div className="grid grid-cols-2 gap-4">
        {currentGame.players.map((player) => (
          <div key={player.id} className="space-y-2">
            <div className="font-medium text-gray-900 dark:text-white">
              {player.name}
              {player.id === currentPlayer.id && (
                <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">(Current)</span>
              )}
            </div>
            <div className="space-y-1">
              {/* Numbers Progress */}
              <div className="mb-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Numbers</div>
                {requiredNumbers.map((num) => {
                  const hits = player.cricketHits?.[num] || 0;
                  const remaining = 3 - hits;
                  const isClosed = hits >= 3;
                  const isCurrentPlayer = player.id === currentPlayer.id;

                  return (
                    <div
                      key={num}
                      className={`flex items-center justify-between p-2 rounded ${
                        isClosed
                          ? 'bg-green-100 dark:bg-green-900'
                          : isCurrentPlayer
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 dark:text-white">
                          {num === 25 ? 'Bull' : num}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          ({hits}/3)
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3].map((required) => (
                          <div
                            key={required}
                            className={`w-2 h-2 rounded-full ${
                              required <= hits
                                ? 'bg-green-500'
                                : required <= remaining
                                ? 'bg-blue-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Doubles Progress */}
              <div className="mb-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Doubles</div>
                <div className={`flex items-center justify-between p-2 rounded ${
                  (player.cricketHits?.doubles || 0) >= 3
                    ? 'bg-green-100 dark:bg-green-900'
                    : player.id === currentPlayer.id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <span className="text-gray-900 dark:text-white">
                    ({player.cricketHits?.doubles || 0}/3)
                  </span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3].map((required) => (
                      <div
                        key={required}
                        className={`w-2 h-2 rounded-full ${
                          required <= (player.cricketHits?.doubles || 0)
                            ? 'bg-green-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Triples Progress */}
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Triples</div>
                <div className={`flex items-center justify-between p-2 rounded ${
                  (player.cricketHits?.triples || 0) >= 3
                    ? 'bg-green-100 dark:bg-green-900'
                    : player.id === currentPlayer.id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <span className="text-gray-900 dark:text-white">
                    ({player.cricketHits?.triples || 0}/3)
                  </span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3].map((required) => (
                      <div
                        key={required}
                        className={`w-2 h-2 rounded-full ${
                          required <= (player.cricketHits?.triples || 0)
                            ? 'bg-green-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CricketProgress; 