'use client';

import React, { useState } from 'react';
import { Player } from '../types/game';

type PlayerSetupProps = {
  onStart: (players: Player[]) => void;
};

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStart }) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: '', score: 0, throws: [], cricketHits: { doubles: 0, triples: 0 } },
    { id: '2', name: '', score: 0, throws: [], cricketHits: { doubles: 0, triples: 0 } },
  ]);

  const handleNameChange = (id: string, name: string) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, name } : player
    ));
  };

  const handleAddPlayer = () => {
    const newId = (players.length + 1).toString();
    setPlayers([
      ...players,
      { id: newId, name: '', score: 0, throws: [], cricketHits: { doubles: 0, triples: 0 } }
    ]);
  };

  const handleRemovePlayer = (id: string) => {
    if (players.length > 2) {
      setPlayers(players.filter(player => player.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (players.every(player => player.name.trim())) {
      onStart(players);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {players.map((player) => (
        <div key={player.id} className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Player {player.id}
            </label>
            <input
              type="text"
              value={player.name}
              onChange={(e) => handleNameChange(player.id, e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={`Enter Player ${player.id} name`}
              required
            />
          </div>
          {players.length > 2 && (
            <button
              type="button"
              onClick={() => handleRemovePlayer(player.id)}
              className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleAddPlayer}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Player
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Game
        </button>
      </div>
    </form>
  );
};

export default PlayerSetup; 