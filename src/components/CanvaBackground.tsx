import React, { useEffect, useRef } from 'react';
import MyCustomSVG from '../assets/smoke_svg.svg';
import ButtonSVG from '../assets/button_svg.svg';

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

    const drawShape = (shape: string, x: number, y: number, size: number, opacity: number, img?: HTMLImageElement) => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(28, 28, 30)';
      ctx.lineWidth = 3;
      ctx.globalAlpha = opacity;

      switch (shape) {
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
        case 'plug':
          // Draw the square
          ctx.rect(x - size / 2, y - size / 2, size, size);
          ctx.stroke();

          // Draw the two little circles inside the square
          const circleRadius = size / 8;
          ctx.beginPath();
          ctx.arc(x - size / 4, y, circleRadius, 0, 2 * Math.PI);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x + size / 4, y, circleRadius, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case 'customSVG':
        case 'buttonSVG':
          if (img) {
            ctx.globalAlpha = 1; // Ensure full opacity for the SVG
            ctx.drawImage(img, x, y, size, size);
          }
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

    const animate = (images: { [key: string]: HTMLImageElement }) => {
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

        drawShape(shapeObj.shape, shapeObj.x, shapeObj.y, shapeObj.size, shapeObj.opacity, images[shapeObj.shape]);
      });

      requestAnimationFrame(() => animate(images));
    };

    const shapes = ['customSVG', 'buttonSVG',  'line', 'triangle', 'hexagon', 'plug'];
    const shapeObjects = Array.from({ length: 100 }, () => ({
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
    window.addEventListener('resize', resizeCanvas);

    // Load the SVGs and start the animation
    const images: { [key: string]: HTMLImageElement } = {};
    const loadImage = (src: string, key: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          images[key] = img;
          resolve();
        };
      });
    };

    Promise.all([
      loadImage(MyCustomSVG, 'customSVG'),
      loadImage(ButtonSVG, 'buttonSVG'),
    ]).then(() => {
      animate(images);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
      <img id="hidden-svg" src={MyCustomSVG} style={{ display: 'none' }} alt="hidden-svg" />
      <img id="hidden-button-svg" src={ButtonSVG} style={{ display: 'none' }} alt="hidden-button-svg" />
    </>
  );
};

export default BackgroundCanvas;