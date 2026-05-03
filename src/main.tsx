import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safe global fallback for Solana/Web3 libraries using a Proxy
// This prevents errors when libraries try to overwrite read-only properties like 'fetch'
if (typeof (window as any).global === 'undefined') {
  (window as any).global = new Proxy(window, {
    set: (target: any, prop: string | symbol, value: any) => {
      if (prop === 'fetch') return true; // Silently ignore attempts to overwrite fetch
      try {
        target[prop] = value;
      } catch (e) {
        // Ignore other read-only property errors
      }
      return true;
    },
    get: (target: any, prop: string | symbol) => {
      return target[prop];
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
