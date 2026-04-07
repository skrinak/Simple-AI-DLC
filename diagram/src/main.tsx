import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from '@xyflow/react';
import { ColorModeProvider } from './ColorModeContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </ColorModeProvider>
  </React.StrictMode>,
);
