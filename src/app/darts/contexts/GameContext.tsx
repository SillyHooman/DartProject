'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { Game, GameType, Player, Throw, GameStatus } from '../types/game';

type GameState = {
  currentGame: Game | null;
};

type GameAction =
  | { type: 'START_GAME'; payload: { type: GameType; players: Player[]; startingScore?: number } }
  | { type: 'ADD_THROW'; payload: { playerId: string; throw: Throw } }
  | { type: 'NEXT_PLAYER' }
  | { type: 'END_GAME'; payload: { winnerId: string } };

type CricketHits = {
  [key: number]: number;
  bull: number;
  doubles: number;
  triples: number;
};

const initialState: GameState = {
  currentGame: null,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        currentGame: {
          id: Date.now().toString(),
          type: action.payload.type,
          players: action.payload.players.map(player => ({
            ...player,
            score: action.payload.type === GameType.Countdown ? (action.payload.startingScore || 501) : 0,
            throws: [],
            cricketHits: action.payload.type === GameType.Cricket ? {
              15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, bull: 0,
              doubles: 0,
              triples: 0
            } : undefined
          })),
          currentPlayerIndex: 0,
          startingScore: action.payload.startingScore,
          isComplete: false,
          startTime: new Date(),
          status: GameStatus.IN_PROGRESS
        }
      };

    case 'ADD_THROW': {
      if (!state.currentGame) return state;
      const throwValue = action.payload.throw.value;
      if (throwValue === null) return state;

      const updatedPlayers = state.currentGame.players.map(player => {
        if (player.id !== action.payload.playerId) return player;

        const newThrows = [...player.throws, action.payload.throw];
        
        if (state.currentGame?.type === GameType.Countdown) {
          const points = throwValue * action.payload.throw.multiplier;
          return {
            ...player,
            score: player.score - points,
            throws: newThrows
          };
        } else if (state.currentGame?.type === GameType.Cricket && player.cricketHits) {
          const hits = action.payload.throw.multiplier;
          const currentHits = { ...player.cricketHits } as CricketHits;
          
          // Special case for direct double/triple claims
          if (throwValue === 0) {
            if (hits === 2) {
              currentHits.doubles = (currentHits.doubles || 0) + 1;
            } else if (hits === 3) {
              currentHits.triples = (currentHits.triples || 0) + 1;
            }
            return {
              ...player,
              throws: newThrows,
              cricketHits: currentHits
            };
          }

          // Regular number hits that also count towards doubles/triples
          if (hits === 2) {
            currentHits.doubles = (currentHits.doubles || 0) + 1;
          } else if (hits === 3) {
            currentHits.triples = (currentHits.triples || 0) + 1;
          }

          if (throwValue === 25) { // Bullseye
            return {
              ...player,
              throws: newThrows,
              cricketHits: {
                ...currentHits,
                bull: (currentHits.bull || 0) + hits
              }
            };
          } else if (throwValue >= 15 && throwValue <= 20) {
            return {
              ...player,
              throws: newThrows,
              cricketHits: {
                ...currentHits,
                [throwValue]: (currentHits[throwValue] || 0) + hits
              }
            };
          }
        }
        return player;
      });

      // Check if game is complete
      let isComplete = false;
      let winner = undefined;

      if (state.currentGame.type === GameType.Countdown) {
        isComplete = updatedPlayers.some(player => player.score === 0);
        winner = isComplete ? updatedPlayers.find(player => player.score === 0)?.id : undefined;
      } else if (state.currentGame.type === GameType.Cricket) {
        // Check if any player has closed all numbers (3 hits each) AND hit required doubles and triples
        isComplete = updatedPlayers.some(player => {
          const allNumbersClosed = [15, 16, 17, 18, 19, 20].every(num => 
            (player.cricketHits?.[num] || 0) >= 3
          ) && (player.cricketHits?.bull || 0) >= 3;
          
          const doublesComplete = (player.cricketHits?.doubles || 0) >= 3;
          const triplesComplete = (player.cricketHits?.triples || 0) >= 3;
          
          const hasWon = allNumbersClosed && doublesComplete && triplesComplete;
          if (hasWon) {
            winner = player.id;
          }
          return hasWon;
        });
      }

      return {
        currentGame: {
          ...state.currentGame,
          players: updatedPlayers,
          isComplete,
          winner,
          status: isComplete ? GameStatus.COMPLETED : GameStatus.IN_PROGRESS
        }
      };
    }

    case 'NEXT_PLAYER':
      if (!state.currentGame) return state;

      return {
        currentGame: {
          ...state.currentGame,
          currentPlayerIndex: (state.currentGame.currentPlayerIndex + 1) % state.currentGame.players.length
        }
      };

    case 'END_GAME':
      if (!state.currentGame) return state;

      return {
        currentGame: {
          ...state.currentGame,
          isComplete: true,
          winner: action.payload.winnerId,
          status: GameStatus.COMPLETED
        }
      };

    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 