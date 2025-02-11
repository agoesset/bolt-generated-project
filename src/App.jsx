import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameBoard } from './components/GameBoard';
import { useGameLogic } from './hooks/useGameLogic';

export default function App() {
  const {
    snake,
    food,
    score,
    gameOver,
    direction,
    setDirection,
    resetGame
  } = useGameLogic();

  return (
    <div className="game-container">
      <div className="score">Score: {score}</div>
      <GameBoard
        snake={snake}
        food={food}
        gameOver={gameOver}
        onRestart={resetGame}
      />
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
