'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

type Settings = {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: boolean;
  defaultGameType: '501' | '301' | '201' | 'cricket';
};

const defaultSettings: Settings = {
  soundEnabled: true,
  vibrationEnabled: true,
  darkMode: false,
  defaultGameType: '501',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('dartsSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('dartsSettings', JSON.stringify(newSettings));
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Sound Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Sound & Vibration</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Sound Effects</span>
                <button
                  onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Vibration</span>
                <button
                  onClick={() => updateSetting('vibrationEnabled', !settings.vibrationEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.vibrationEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Dark Mode</span>
                <button
                  onClick={() => updateSetting('darkMode', !settings.darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Game Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Game Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Game Type
                </label>
                <select
                  value={settings.defaultGameType}
                  onChange={(e) => updateSetting('defaultGameType', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="501">501</option>
                  <option value="301">301</option>
                  <option value="201">201</option>
                  <option value="cricket">Cricket</option>
                </select>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <div className="text-sm text-gray-600">
              <p>Darts Tracker v1.0.0</p>
              <p className="mt-2">A simple and elegant way to track your darts games.</p>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </main>
  );
} 