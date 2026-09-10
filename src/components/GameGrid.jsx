import React from 'react';
import GameCard from './GameCard';

/**
 * GameGrid layout component.
 * Desktop: 3 cards top row, 2 cards centered bottom row.
 * Tablet: 2 + 2 + 1 layout.
 * Mobile: 1 card per row.
 */
const GameGrid = ({ games }) => {
  const firstRow = games.slice(0, 3);
  const secondRow = games.slice(3, 5);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-8">
      {/* Desktop 3-column top row / Tablet 2-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {firstRow.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Desktop 2-card centered bottom row / Responsive continuation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 lg:max-w-4xl lg:mx-auto">
        {secondRow.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
