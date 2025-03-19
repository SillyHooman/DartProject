'use client';

import React, { useState } from 'react';
import CustomGame from '@/components/games/CustomGame';

interface Player {
  id: string;
  name: string;
  score: number;
  history: number[];
}

interface GameSettings {
  initialScore: number;
  playerCount: number;
  doubleIn: boolean;
  doubleOut: boolean;
  playerNames: string[];
}

export default function CustomGamePage() {
  const [settings, setSettings] = useState<GameSettings>({
    initialScore: 501,
    playerCount: 2,
    doubleIn: false,
    doubleOut: false,
    playerNames: ['Player 1', 'Player 2'],
  });
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const handleGameEnd = (winner: Player) => {
    setWinner(winner);
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newNames = [...settings.playerNames];
    newNames[index] = name;
    setSettings(prev => ({ ...prev, playerNames: newNames }));
  };

  const addPlayer = () => {
    if (settings.playerCount >= 8) return;
    
    const newCount = settings.playerCount + 1;
    const newNames = [...settings.playerNames, `Player ${newCount}`];
    
    setSettings(prev => ({
      ...prev,
      playerCount: newCount,
      playerNames: newNames,
    }));
  };

  const removePlayer = (index: number) => {
    if (settings.playerCount <= 1) return;
    
    const newCount = settings.playerCount - 1;
    const newNames = settings.playerNames.filter((_, i) => i !== index);
    
    setSettings(prev => ({
      ...prev,
      playerCount: newCount,
      playerNames: newNames,
    }));
  };

  const startNewGame = () => {
    const newPlayers = Array.from({ length: settings.playerCount }, (_, i) => ({
      id: String(i + 1),
      name: settings.playerNames[i],
      score: settings.initialScore,
      history: [],
    }));
    setPlayers(newPlayers);
    setGameStarted(true);
    setWinner(null);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Custom Darts Game</h1>
          
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-lg mb-2">Starting Score:</label>
              <input
                type="number"
                value={settings.initialScore}
                onChange={(e) => setSettings(prev => ({ ...prev, initialScore: Number(e.target.value) }))}
                min="1"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg w-32"
              />
            </div>

            {/* Player Management Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Players</h2>
              <div className="space-y-4">
                {Array.from({ length: settings.playerCount }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-lg mb-2">Player {i + 1} Name:</label>
                      <input
                        type="text"
                        value={settings.playerNames[i]}
                        onChange={(e) => handlePlayerNameChange(i, e.target.value)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
                        placeholder={`Enter Player ${i + 1} name`}
                      />
                    </div>
                    {settings.playerCount > 1 && (
                      <button
                        onClick={() => removePlayer(i)}
                        className="mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {settings.playerCount < 8 && (
                  <button
                    onClick={addPlayer}
                    className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    Add Player
                  </button>
                )}
              </div>
            </div>

            {/* Game Options */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Game Options</h2>
              <div className="flex items-center justify-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.doubleIn}
                    onChange={(e) => setSettings(prev => ({ ...prev, doubleIn: e.target.checked }))}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>Double In</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.doubleOut}
                    onChange={(e) => setSettings(prev => ({ ...prev, doubleOut: e.target.checked }))}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>Double Out</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={startNewGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Start New Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {winner ? (
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl mb-8">
            {winner.name} wins with {winner.history.slice(-3).join(', ')}!
          </p>
          <button
            onClick={() => setGameStarted(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            New Game
          </button>
        </div>
      ) : (
        <CustomGame 
          players={players} 
          onGameEnd={handleGameEnd}
          settings={settings}
        />
      )}
    </div>
  );
} 