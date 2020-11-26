import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { Layout } from './components/Layout'
import { StripeJSProvider } from './provider/StripeJS'
ReactDOM.render(
  <React.StrictMode>
    <StripeJSProvider>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </StripeJSProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
