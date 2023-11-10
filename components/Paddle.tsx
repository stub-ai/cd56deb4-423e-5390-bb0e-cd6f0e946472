import React from 'react';

interface PaddleProps {
  position: { x: number, y: number },
  width: number,
  height: number,
}

const Paddle: React.FC<PaddleProps> = ({ position, width, height }) => {
  return (
    <div style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: width,
      height: height,
      backgroundColor: 'white',
    }} />
  );
};

export default Paddle;