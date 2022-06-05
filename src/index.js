import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './context/auth-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
// AuthContextProvider -> one center place for state management
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
