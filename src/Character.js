import React from 'react';

const Character = ({ position, jumping }) => {
  const characterStyle = {
    position: 'absolute',
    bottom: `${jumping ? '50px' : '0'}`,
    left: `${position}px`,
    width: '50px',
    height: '100px', // Example: Adjust the character's height as needed
    backgroundColor: 'blue',
    transition: 'bottom 0.5s',
    display: 'flex', // Add flexbox display to center the robot's parts
    alignItems: 'center', // Vertically center the robot's parts
    justifyContent: 'center', // Horizontally center the robot's parts
  };

  const headStyle = {
    width: '30px',
    height: '30px',
    backgroundColor: 'gray',
    borderRadius: '50%',
  };

  const bodyStyle = {
    width: '20px',
    height: '50px',
    backgroundColor: 'red',
  };

  const armStyle = {
    width: '5px',
    height: '40px',
    backgroundColor: 'yellow',
  };

  const legStyle = {
    width: '10px',
    height: '40px',
    backgroundColor: 'green',
  };

  const characterClassName = `character ${jumping ? 'jump-animation' : ''}`;

  return (
    <div style={characterStyle} className={characterClassName}>
      


      <div style={headStyle}></div>
      <div style={bodyStyle}></div>
      <div style={armStyle}></div>
      <div style={armStyle}></div>
      <div style={legStyle}></div>
      <div style={legStyle}></div>
    </div>
  );
};

export default Character;
