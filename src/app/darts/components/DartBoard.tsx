'use client';

import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';

type Throw = {
  value: number | null;
  multiplier: 1 | 2 | 3;
};

const DartBoard = () => {
  const { dispatch, state } = useGame();
  const currentPlayer = state.players[state.currentPlayerIndex];
  const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1);
  const [throws, setThrows] = useState<Throw[]>([
    { value: null, multiplier: 1 },
    { value: null, multiplier: 1 },
    { value: null, multiplier: 1 }
  ]);
  const [currentThrowIndex, setCurrentThrowIndex] = useState(0);
  const [showBustMessage, setShowBustMessage] = useState(false);

  const handleNumberSelect = (num: number) => {
    if (currentThrowIndex >= 3) return;
    
    const newThrows = [...throws];
    newThrows[currentThrowIndex] = {
      value: num,
      multiplier
    };
    setThrows(newThrows);
    
    // Move to next throw if available
    if (currentThrowIndex < 2) {
      setCurrentThrowIndex(currentThrowIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (!currentPlayer) return;
    
    // Calculate total points
    const totalPoints = throws.reduce((sum, t) => 
      sum + (t.value ? t.value * t.multiplier : 0), 0
    );
    
    // Check if this would bust
    if (currentPlayer.score - totalPoints < 0) {
      setShowBustMessage(true);
      setTimeout(() => setShowBustMessage(false), 2000);
      return;
    }

    // Submit all throws
    throws.forEach(t => {
      if (t.value) {
        dispatch({
          type: 'ADD_THROW',
          payload: {
            playerId: currentPlayer.id,
            value: t.value,
            multiplier: t.multiplier,
          },
        });
      }
    });
    
    // Reset for next round
    setThrows([
      { value: null, multiplier: 1 },
      { value: null, multiplier: 1 },
      { value: null, multiplier: 1 }
    ]);
    setCurrentThrowIndex(0);

    // Switch to next player
    dispatch({ type: 'NEXT_PLAYER' });
  };

  const handleMultiplierChange = (newMultiplier: 1 | 2 | 3) => {
    setMultiplier(newMultiplier);
    const newThrows = [...throws];
    newThrows[currentThrowIndex] = {
      ...newThrows[currentThrowIndex],
      multiplier: newMultiplier
    };
    setThrows(newThrows);
  };

  const numbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

  // Check if all three throws are made
  const allThrowsMade = throws.every(t => t.value !== null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {/* Current Player Display */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-600 mb-1">Current Turn</div>
        <div className="text-lg font-semibold text-blue-800">
          {currentPlayer?.name}
        </div>
      </div>

      {/* Display */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-sm text-gray-500 mb-2">Current Round</div>
        <div className="grid grid-cols-3 gap-2">
          {throws.map((t, index) => (
            <div
              key={index}
              className={`p-2 rounded text-center ${
                index === currentThrowIndex ? 'bg-blue-100' : 'bg-gray-50'
              }`}
            >
              <div className="text-sm text-gray-500">
                {t.multiplier === 2 ? 'D' : t.multiplier === 3 ? 'T' : 'S'}
              </div>
              <div className="text-xl font-bold">
                {t.value || '-'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bust Message */}
      {showBustMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          Bust! Score remains at {currentPlayer?.score}
        </div>
      )}

      {/* Multiplier Selection */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => handleMultiplierChange(1)}
          className={`flex-1 py-2 rounded ${
            multiplier === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Single
        </button>
        <button
          onClick={() => handleMultiplierChange(2)}
          className={`flex-1 py-2 rounded ${
            multiplier === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Double
        </button>
        <button
          onClick={() => handleMultiplierChange(3)}
          className={`flex-1 py-2 rounded ${
            multiplier === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Triple
        </button>
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-5 gap-2">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => handleNumberSelect(num)}
            disabled={allThrowsMade}
            className={`p-4 rounded-lg text-lg font-semibold ${
              allThrowsMade
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!allThrowsMade}
        className={`w-full mt-4 py-3 rounded-lg text-white font-semibold ${
          allThrowsMade
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Submit Round
      </button>
    </div>
  );
};

export default DartBoard; 