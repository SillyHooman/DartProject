'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Game, Player, GameType, GameStatus } from '../types/game';

type GameState = {
  currentGame: Game | null;
  players: Player[];
  currentPlayerIndex: number;
};

type GameAction =
  | { type: 'START_GAME'; payload: { gameType: GameType; players: Player[] } }
  | { type: 'ADD_THROW'; payload: { playerId: string; value: number; multiplier: 1 | 2 | 3 } }
  | { type: 'END_GAME' }
  | { type: 'CANCEL_GAME' }
  | { type: 'NEXT_PLAYER' };

const initialState: GameState = {
  currentGame: null,
  players: [],
  currentPlayerIndex: 0,
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        currentGame: {
          id: Date.now().toString(),
          players: action.payload.players,
          startTime: new Date(),
          gameType: action.payload.gameType,
          status: GameStatus.IN_PROGRESS,
        },
        players: action.payload.players,
        currentPlayerIndex: 0,
      };
    case 'ADD_THROW':
      if (!state.currentGame) return state;
      
      const updatedPlayers = state.players.map(player => {
        if (player.id === action.payload.playerId) {
          const pointsToSubtract = action.payload.value * action.payload.multiplier;
          
          // Check if this throw would bust the player
          if (player.score - pointsToSubtract < 0) {
            // In 501, if you bust, you go back to your previous score
            return {
              ...player,
              throws: [...player.throws, {
                id: Date.now().toString(),
                value: action.payload.value,
                multiplier: action.payload.multiplier,
                timestamp: new Date(),
                bust: true
              }],
            };
          }

          const newThrow = {
            id: Date.now().toString(),
            value: action.payload.value,
            multiplier: action.payload.multiplier,
            timestamp: new Date(),
            bust: false
          };

          return {
            ...player,
            throws: [...player.throws, newThrow],
            score: Math.max(0, player.score - pointsToSubtract),
          };
        }
        return player;
      });

      // Check if any player has won (reached 0)
      const hasWinner = updatedPlayers.some(player => player.score === 0);
      if (hasWinner) {
        return {
          ...state,
          players: updatedPlayers,
          currentGame: {
            ...state.currentGame,
            players: updatedPlayers,
            status: GameStatus.COMPLETED,
            endTime: new Date(),
          },
        };
      }

      return {
        ...state,
        players: updatedPlayers,
        currentGame: {
          ...state.currentGame,
          players: updatedPlayers,
        },
      };
    case 'NEXT_PLAYER':
      return {
        ...state,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      };
    case 'END_GAME':
      if (!state.currentGame) return state;
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          endTime: new Date(),
          status: GameStatus.COMPLETED,
        },
      };
    case 'CANCEL_GAME':
      if (!state.currentGame) return state;
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          endTime: new Date(),
          status: GameStatus.CANCELLED,
        },
      };
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 