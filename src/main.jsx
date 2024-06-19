import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseProvider } from './FirebaseProvider.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <FirebaseProvider>
      <App />
    </FirebaseProvider> */}
    <Provider store={store}>
    <App />
  </Provider>,
  </BrowserRouter>
);