import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './utils/i18n.ts';
import BackgroundCanvas from './components/CanvaBackground.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <BackgroundCanvas />
      <App />
    </>
  </StrictMode>,
);