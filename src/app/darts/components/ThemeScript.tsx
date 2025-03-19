'use client';

import { useEffect } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Get the saved theme or system preference
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Apply the theme immediately
      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return null;
} 