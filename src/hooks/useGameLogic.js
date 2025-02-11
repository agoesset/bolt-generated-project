import { useState, useEffect, useCallback } from 'react';

const INITIAL_SNAKE = [[5, 5], [4, 5], [3, 5]];
const BOARD_WIDTH = 30;
const BOARD_HEIGHT = 20;

export function useGameLogic() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * BOARD_WIDTH),
      Math.floor(Math.random() * BOARD_HEIGHT)
    ];
    setFood(newFood);
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    generateFood();
  }, [generateFood]);

  const checkCollision = useCallback((head) => {
    // Wall collision
    if (
      head[0] < 0 ||
      head[0] >= BOARD_WIDTH ||
      head[1] < 0 ||
      head[1] >= BOARD_HEIGHT
    ) {
      return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }

    return false;
  }, [snake]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      const head = [...snake[0]];

      switch (direction) {
        case 'UP':
          head[1] -= 1;
          break;
        case 'DOWN':
          head[1] += 1;
          break;
        case 'LEFT':
          head[0] -= 1;
          break;
        case 'RIGHT':
          head[0] += 1;
          break;
      }

      if (checkCollision(head)) {
        setGameOver(true);
        return;
      }

      const newSnake = [head];
      const ateFood = head[0] === food[0] && head[1] === food[1];

      if (ateFood) {
        setScore(s => s + 1);
        generateFood();
      }

      for (let i = 0; i < snake.length - (ateFood ? 0 : 1); i++) {
        newSnake.push([...snake[i]]);
      }

      setSnake(newSnake);
    };

    const gameInterval = setInterval(moveSnake, 100);
    return () => clearInterval(gameInterval);
  }, [snake, direction, food, gameOver, checkCollision, generateFood]);

  return {
    snake,
    food,
    score,
    gameOver,
    direction,
    setDirection,
    resetGame
  };
}
