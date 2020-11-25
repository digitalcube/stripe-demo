import { NorthStarThemeProvider } from 'aws-northstar';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <NorthStarThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NorthStarThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
