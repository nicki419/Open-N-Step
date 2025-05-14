import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DarkModeProvider } from './Utilities/DarkModeContext';
import { SerialProvider } from './Utilities/SerialContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DarkModeProvider>
    <SerialProvider>
      <App />
    </SerialProvider>
    </DarkModeProvider>
  </React.StrictMode>
);

reportWebVitals();