# 2Bro's Darts 🎯

A modern web application for tracking darts games, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎯 Virtual dartboard interface
- 👥 Multi-player support
- 📊 Real-time score tracking
- 🎮 Three-throw round system
- ⚡ Automatic player turn switching
- 🚫 Bust detection
- 📱 Responsive design for all devices

## Game Rules

The application supports standard 501 darts rules:
- Players start with 501 points
- Each player gets three throws per turn
- Players must reach exactly 0 to win
- Going below 0 results in a "bust" and the player's score remains unchanged
- Players take turns throwing three darts each

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Vercel (recommended)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Sillyhooman/DartProject.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── darts/
│   │   ├── components/     # React components
│   │   ├── contexts/      # Game state management
│   │   ├── types/         # TypeScript type definitions
│   │   ├── page.tsx       # Main game page
│   │   └── layout.tsx     # Game layout
│   └── api/              # API routes
└── lib/                  # Utility functions and configurations
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and Tailwind CSS
- Inspired by traditional darts scoring systems
- Created by Sillyhooman 