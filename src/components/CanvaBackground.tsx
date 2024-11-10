import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const drawShape = (shape: string, x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(28, 28, 30)';
      ctx.lineWidth = 2;
      ctx.globalAlpha = opacity;

      switch (shape) {
        case 'pentagon':
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const xPos = x + size * Math.cos(angle);
            const yPos = y + size * Math.sin(angle);
            if (i === 0) {
              ctx.moveTo(xPos, yPos);
            } else {
              ctx.lineTo(xPos, yPos);
            }
          }
          ctx.closePath();
          break;
        case 'line':
          ctx.moveTo(x, y);
          ctx.lineTo(x + size, y + size);
          break;
        case 'triangle':
          ctx.moveTo(x, y);
          ctx.lineTo(x + size, y);
          ctx.lineTo(x + size / 2, y - size);
          ctx.closePath();
          break;
        case 'hexagon':
          for (let i = 0; i < 6; i++) {
            const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
            const xPos = x + size * Math.cos(angle);
            const yPos = y + size * Math.sin(angle);
            if (i === 0) {
              ctx.moveTo(xPos, yPos);
            } else {
              ctx.lineTo(xPos, yPos);
            }
          }
          ctx.closePath();
          break;
      }
      ctx.stroke();
      ctx.globalAlpha = 1; // Reset alpha
    };

    const drawGrid = () => {
      const gridSize = 70;
      ctx.strokeStyle = 'rgba(28, 28, 30, 0.2)';
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      shapeObjects.forEach((shapeObj) => {
        shapeObj.opacity += shapeObj.fadeDirection * 0.001;
        if (shapeObj.opacity <= 0 || shapeObj.opacity >= 1) {
          shapeObj.fadeDirection *= -1;
        }

        shapeObj.x += shapeObj.dx;
        shapeObj.y += shapeObj.dy;

        // Keep shapes within canvas bounds
        if (shapeObj.x < 0 || shapeObj.x > canvas.width) shapeObj.dx *= -1;
        if (shapeObj.y < 0 || shapeObj.y > canvas.height) shapeObj.dy *= -1;

        drawShape(shapeObj.shape, shapeObj.x, shapeObj.y, shapeObj.size, shapeObj.opacity);
      });

      requestAnimationFrame(animate);
    };

    const shapes = ['pentagon', 'line', 'triangle', 'hexagon'];
    const shapeObjects = Array.from({ length: 50 }, () => ({
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 50,
      opacity: Math.random(),
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
      dx: (Math.random() - 0.5) * 0.5, // Small random movement in x direction
      dy: (Math.random() - 0.5) * 0.5, // Small random movement in y direction
    }));

    resizeCanvas();
    window.addEventListener('resize', () => {
      resizeCanvas();
      // Reinitialize shape positions and sizes on resize
      shapeObjects.forEach((shapeObj) => {
        shapeObj.x = Math.random() * window.innerWidth;
        shapeObj.y = Math.random() * window.innerHeight;
        shapeObj.size = Math.random() * 50;
      });
    });
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default BackgroundCanvas;