import React, { useState, useEffect } from 'react';
import Character from './Character';

const Game = () => {
  const [position, setPosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [jumping, setJumping] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' && !jumping) {
      setJumping(true);
      setPosition((prevPosition) => prevPosition - 100); // Example: Move the character up
      setTimeout(() => {
        setJumping(false);
        setPosition((prevPosition) => prevPosition + 100); // Example: Move the character back down after the jump
      }, 500); // Example: Set the jump duration to 500ms
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const gameLoopInterval = setInterval(() => {
      if (!gameOver) {
        setPosition((prevPosition) => prevPosition + 5); // Example: Adjust the character speed as needed

        // Check boundary to prevent character from going off the screen
        const screenWidth = window.innerWidth;
        const characterWidth = 50; // Adjust according to the character's width
        const boundary = screenWidth - characterWidth;
        if (position > boundary) {
          setPosition(boundary);
        }

        // Add additional game state updates here
      }
    }, 1000 / 60);

    return () => {
      clearInterval(gameLoopInterval);
    };
  }, [gameOver]);

  // Rest of the code
  return (
    <div>
      {gameOver ? (
        <div>
          <h1>Game Over</h1>
          <button onClick={() => setGameOver(false)}>Restart</button>
        </div>
      ) : (
        <>
          <Character position={position} jumping={jumping} />
          {/* Render other game components */}
        </>
      )}
    </div>
  );
};

export default Game;
