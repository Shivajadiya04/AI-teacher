/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or './main.css' if you renamed it
import { UserProvider } from "./context/UserContext"; // import context


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

// main.jsx
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from "./context/UserProvider.jsx"; // <-- yaha impor

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)


