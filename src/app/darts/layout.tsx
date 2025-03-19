'use client';

import React from 'react';
import { GameProvider } from './contexts/GameContext';
import { ThemeProvider } from './contexts/ThemeContext';

export default function DartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </ThemeProvider>
  );
} 