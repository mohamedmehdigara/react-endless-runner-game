import React, { useState, useEffect } from 'react';
import Character from './Character';

const Game = () => {
  const [position, setPosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [jumping, setJumping] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' && !jumping) {
      setJumping(true);
      setTimeout(() => {
        setJumping(false);
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

        // Generate obstacles at regular intervals
        const obstacleInterval = Math.random() * 3000 + 1000; // Random interval between 1s and 4s
        if (Math.random() < 0.02) { // Adjust obstacle generation probability as needed
          generateObstacle();
        }

        // Move obstacles towards the character
        setObstacles((prevObstacles) =>
          prevObstacles.map((obstacle) => ({
            ...obstacle,
            position: obstacle.position - 5, // Example: Adjust the obstacle speed as needed
          }))
        );

        // Check collision with obstacles
        checkCollisions();
      }
    }, 1000 / 60);

    return () => {
      clearInterval(gameLoopInterval);
    };
  }, [gameOver]);

  const generateObstacle = () => {
    const newObstacle = {
      id: Date.now(),
      position: window.innerWidth,
    };
    setObstacles((prevObstacles) => [...prevObstacles, newObstacle]);
  };

  const checkCollisions = () => {
    const characterBounds = {
      left: position,
      right: position + 50, // Example: Adjust the character's width as needed
      top: jumping ? 50 : 0, // Adjust the jump height as needed
      bottom: jumping ? 100 : 50, // Adjust the jump height as needed
    };

    obstacles.forEach((obstacle) => {
      const obstacleBounds = {
        left: obstacle.position,
        right: obstacle.position + 50, // Adjust the obstacle's width as needed
        top: 0,
        bottom: 50,
      };

      if (
        characterBounds.left < obstacleBounds.right &&
        characterBounds.right > obstacleBounds.left &&
        characterBounds.bottom > obstacleBounds.top &&
        characterBounds.top < obstacleBounds.bottom
      ) {
        if (characterBounds.bottom < obstacleBounds.bottom) {
          // Successful jump on the obstacle
          setScore((prevScore) => prevScore + 1);
        } else {
          // Collision with the obstacle
          setGameOver(true);
        }
      }
    });
  };

  const restartGame = () => {
    setPosition(0);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div>
      {gameOver ? (
        <div>
          <h1>Game Over</h1>
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <>
          <Character position={position} jumping={jumping} />
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              style={{
                position: 'absolute',
                bottom: '0',
                left: `${obstacle.position}px`,
                width: '50px', // Adjust the obstacle's width as needed
                height: '50px', // Adjust the obstacle's height as needed
                backgroundColor: 'red',
              }}
            ></div>
          ))}
          <div>Score: {score}</div>
        </>
      )}
    </div>
  );
};

export default Game;
