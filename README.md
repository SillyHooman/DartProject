# Darts Game Application

A modern web-based darts scoring application built with Next.js 14, TypeScript, and Tailwind CSS. The application supports two classic darts games: Countdown (formerly X01) and Cricket.

## Features

### Countdown Game
- Multiple starting score options (401, 501, 601, 701, 1001)
- Real-time score tracking
- Support for singles, doubles, and triples
- Automatic turn management
- Winner detection when reaching exactly zero

### Cricket Game
- Track hits on numbers 15-20 and bullseye
- Support for singles, doubles, and triples
- Visual progress tracking for each number
- Dedicated buttons for claiming doubles and triples
- Automatic game completion when all numbers are closed

### General Features
- Dark mode support
- Responsive design
- Real-time game state management
- Player management system
- Clean and intuitive UI

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Vercel (recommended)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/darts-game.git
cd darts-game
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
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
│   │   ├── game/          # Game page
│   │   └── page.tsx       # Home page
│   └── layout.tsx         # Root layout
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and Tailwind CSS
- Inspired by traditional darts scoring systems
- Created by Sillyhooman 