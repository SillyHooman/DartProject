'use client';

import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Throw } from '../types/game';

const DartBoard = () => {
  const { dispatch, state } = useGame();
  const currentGame = state.currentGame;
  if (!currentGame) return null;

  const currentPlayer = currentGame.players[currentGame.currentPlayerIndex];
  const [throws, setThrows] = useState<Throw[]>([
    { value: null, multiplier: 1 },
    { value: null, multiplier: 1 },
    { value: null, multiplier: 1 },
  ]);
  const [currentThrowIndex, setCurrentThrowIndex] = useState(0);

  const handleNumberClick = (number: number | 'double' | 'triple') => {
    if (currentThrowIndex >= 3) return;

    const newThrows = [...throws];
    if (number === 'double' || number === 'triple') {
      // For double/triple claims, we use a special value (0) with the appropriate multiplier
      newThrows[currentThrowIndex] = { 
        value: 0, 
        multiplier: number === 'double' ? 2 : 3
      };
    } else {
      newThrows[currentThrowIndex] = { 
        value: number, 
        multiplier: newThrows[currentThrowIndex].multiplier 
      };
    }
    setThrows(newThrows);

    // Submit the throw
    dispatch({
      type: 'ADD_THROW',
      payload: {
        playerId: currentPlayer.id,
        throw: newThrows[currentThrowIndex],
      },
    });

    // Move to next throw or player
    if (currentThrowIndex < 2) {
      setCurrentThrowIndex(currentThrowIndex + 1);
    } else {
      setCurrentThrowIndex(0);
      setThrows([
        { value: null, multiplier: 1 },
        { value: null, multiplier: 1 },
        { value: null, multiplier: 1 },
      ]);
      dispatch({ type: 'NEXT_PLAYER' });
    }
  };

  const handleMultiplierClick = (throwIndex: number, newMultiplier: 1 | 2 | 3) => {
    const newThrows = [...throws];
    newThrows[throwIndex] = {
      ...newThrows[throwIndex],
      multiplier: newMultiplier
    };
    setThrows(newThrows);
  };

  // Numbers in clockwise order starting from top
  const dartboardNumbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

  return (
    <div className="space-y-6">
      {/* Current round display */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Round</h3>
        <div className="grid grid-cols-3 gap-2">
          {throws.map((throw_, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                index === currentThrowIndex
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {throw_.multiplier === 1 ? 'Single' : throw_.multiplier === 2 ? 'Double' : 'Triple'}
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {throw_.value || '-'}
              </div>
              <div className="flex justify-center space-x-1 mt-1">
                <button
                  onClick={() => handleMultiplierClick(index, 1)}
                  className={`w-6 h-6 rounded-full text-xs ${
                    throw_.multiplier === 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  S
                </button>
                <button
                  onClick={() => handleMultiplierClick(index, 2)}
                  className={`w-6 h-6 rounded-full text-xs ${
                    throw_.multiplier === 2
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  D
                </button>
                <button
                  onClick={() => handleMultiplierClick(index, 3)}
                  className={`w-6 h-6 rounded-full text-xs ${
                    throw_.multiplier === 3
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  T
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special buttons for claiming doubles and triples */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleNumberClick('double')}
          disabled={currentThrowIndex >= 3}
          className={`p-4 rounded-lg text-xl font-bold ${
            currentThrowIndex >= 3
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          Claim Double
        </button>
        <button
          onClick={() => handleNumberClick('triple')}
          disabled={currentThrowIndex >= 3}
          className={`p-4 rounded-lg text-xl font-bold ${
            currentThrowIndex >= 3
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Claim Triple
        </button>
      </div>

      {/* Number grid */}
      <div className="grid grid-cols-5 gap-2">
        {dartboardNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            disabled={currentThrowIndex >= 3}
            className={`p-4 rounded-lg text-xl font-bold ${
              currentThrowIndex >= 3
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Bullseye */}
      <div className="flex justify-center">
        <button
          onClick={() => handleNumberClick(25)}
          disabled={currentThrowIndex >= 3}
          className={`p-4 rounded-full text-xl font-bold ${
            currentThrowIndex >= 3
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Bull
        </button>
      </div>
    </div>
  );
};

export default DartBoard; 