import React from 'react';

interface BallProps {
  position: { x: number, y: number },
  radius: number,
}

const Ball: React.FC<BallProps> = ({ position, radius }) => {
  return (
    <div style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: radius * 2,
      height: radius * 2,
      borderRadius: '50%',
      backgroundColor: 'white',
    }} />
  );
};

export default Ball;