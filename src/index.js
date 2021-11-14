import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css';
import './services/firebase';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

