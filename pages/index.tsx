import React, { useEffect, useRef, useState } from 'react';
import Paddle from '../components/Paddle';
import Ball from '../components/Ball';

const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 80;
const BALL_RADIUS = 10;

export default function Home() {
  const [paddleY, setPaddleY] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [ballSpeed, setBallSpeed] = useState({ x: 2, y: 2 });

  const gameArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPaddleY(event.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameArea.current) return;

      const { clientWidth, clientHeight } = gameArea.current;

      setBallPos(prevPos => {
        let newX = prevPos.x + ballSpeed.x;
        let newY = prevPos.y + ballSpeed.y;

        if (newX < 0 || newX + BALL_RADIUS * 2 > clientWidth) {
          setBallSpeed(prevSpeed => ({ ...prevSpeed, x: -prevSpeed.x }));
        }

        if (newY < 0 || newY + BALL_RADIUS * 2 > clientHeight) {
          setBallSpeed(prevSpeed => ({ ...prevSpeed, y: -prevSpeed.y }));
        }

        return { x: newX, y: newY };
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [ballSpeed]);

  return (
    <div ref={gameArea} style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <Paddle position={{ x: 0, y: paddleY }} width={PADDLE_WIDTH} height={PADDLE_HEIGHT} />
      <Ball position={ballPos} radius={BALL_RADIUS} />
    </div>
  );
}