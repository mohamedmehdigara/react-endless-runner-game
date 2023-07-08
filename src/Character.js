import React from 'react';

const Character = ({ position, jumping }) => {
  const characterStyle = {
    position: 'absolute',
    bottom: `${jumping ? '50px' : '0'}`,
    left: `${position}px`,
    width: '50px',
    height: '50px',
    backgroundColor: 'blue',
    transition: 'bottom 0.5s',
  };

  const characterClassName = `character ${jumping ? 'jump-animation' : ''}`;

  return <div style={characterStyle} className={characterClassName}></div>;
};

export default Character;
