export enum GameType {
  Countdown = 'Countdown',
  Cricket = 'Cricket',
}

export enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export type Throw = {
  value: number | null;
  multiplier: 1 | 2 | 3;
};

export type Player = {
  id: string;
  name: string;
  score: number;
  throws: Throw[];
  cricketHits?: {
    [key: number]: number; // Tracks hits for each number (15-20 and bull)
    bull?: number; // Special tracking for bullseye
    doubles?: number; // Track doubles hits
    triples?: number; // Track triples hits
  };
};

export type Game = {
  id: string;
  type: GameType;
  players: Player[];
  currentPlayerIndex: number;
  startingScore?: number; // Only for X01 games
  isComplete: boolean;
  winner?: string;
  startTime: Date;
  status: GameStatus;
}; 