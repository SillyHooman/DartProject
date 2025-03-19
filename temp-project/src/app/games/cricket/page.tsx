'use client';

import React, { useState } from 'react';
import GameCricket from '@/components/games/GameCricket';

interface Player {
  id: string;
  name: string;
  score: number;
  history: number[];
}

export default function CricketPage() {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', score: 0, history: [] },
    { id: '2', name: 'Player 2', score: 0, history: [] },
  ]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const handleGameEnd = (winner: Player) => {
    setWinner(winner);
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name };
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length >= 8) return;
    
    const newPlayer = {
      id: String(players.length + 1),
      name: `Player ${players.length + 1}`,
      score: 0,
      history: [],
    };
    
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (index: number) => {
    if (players.length <= 1) return;
    
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
  };

  const startNewGame = () => {
    const newPlayers = players.map(player => ({
      ...player,
      score: 0,
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
          <h1 className="text-4xl font-bold mb-8">Cricket</h1>
          
          {/* Player Management Section */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Players</h2>
            <div className="space-y-4">
              {players.map((player, index) => (
                <div key={player.id} className="flex items-center justify-center space-x-4">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg w-48"
                  />
                  <button
                    onClick={() => removePlayer(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addPlayer}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Add Player
              </button>
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
            {winner.name} wins!
          </p>
          <button
            onClick={startNewGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Play Again
          </button>
        </div>
      ) : (
        <GameCricket players={players} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
} 