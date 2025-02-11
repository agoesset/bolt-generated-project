import React, { useEffect, useRef } from 'react';

const CELL_SIZE = 20;
const BOARD_WIDTH = 600;
const BOARD_HEIGHT = 400;

export function GameBoard({ snake, food, gameOver }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    // Draw snake
    ctx.fillStyle = '#4CAF50';
    snake.forEach(([x, y]) => {
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });

    // Draw food
    ctx.fillStyle = '#FF5252';
    ctx.fillRect(
      food[0] * CELL_SIZE,
      food[1] * CELL_SIZE,
      CELL_SIZE - 1,
      CELL_SIZE - 1
    );

  }, [snake, food]);

  return (
    <canvas
      ref={canvasRef}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      className="game-board"
    />
  );
}
