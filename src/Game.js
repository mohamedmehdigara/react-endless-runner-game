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
    // Generate obstacles at regular intervals
    const obstacleInterval = setInterval(generateObstacle, 2000); // Example: Generate an obstacle every 2 seconds
    // Update obstacles position and check collisions at a high frequency
    const obstacleUpdateInterval = setInterval(updateObstacles, 1000 / 60);
    // Check game over condition at a high frequency
    const gameoverInterval = setInterval(checkGameOver, 1000 / 60);

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(obstacleUpdateInterval);
      clearInterval(gameoverInterval);
    };
  }, []);

  const generateObstacle = () => {
    const newObstacle = {
      id: Date.now(),
      position: window.innerWidth,
    };
    setObstacles((prevState) => [...prevState, newObstacle]);
  };

  const updateObstacles = () => {
    setObstacles((prevState) => {
      const updatedObstacles = prevState.map((obstacle) => ({
        ...obstacle,
        position: obstacle.position - 5, // Example: Adjust the obstacle speed as needed
      }));
      return updatedObstacles.filter((obstacle) => obstacle.position > -100);
    });
  };

  const checkCollisions = () => {
    const characterBounds = document.querySelector('.character').getBoundingClientRect();

    obstacles.forEach((obstacle) => {
      const obstacleBounds = document.getElementById(obstacle.id).getBoundingClientRect();

      if (
        characterBounds.left < obstacleBounds.right &&
        characterBounds.right > obstacleBounds.left &&
        characterBounds.bottom > obstacleBounds.top &&
        characterBounds.top < obstacleBounds.bottom
      ) {
        setGameOver(true);
      }
    });
  };

  const checkGameOver = () => {
    checkCollisions();
    // You can add additional game over conditions here if needed
  };

  const restartGame = () => {
    setPosition(0);
    setObstacles([]);
    setPowerUps([]);
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
          {/* Render other game components */}
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              id={obstacle.id}
              style={{
                position: 'absolute',
                bottom: '0',
                left: `${obstacle.position}px`,
                width: '50px',
                height: '50px',
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
