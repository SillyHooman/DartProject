'use client';

import React from 'react';
import { GameProvider } from './contexts/GameContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeScript from './components/ThemeScript';

export default function DartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ThemeScript />
      <GameProvider>
        {children}
      </GameProvider>
    </ThemeProvider>
  );
} 