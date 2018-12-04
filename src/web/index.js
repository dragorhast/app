/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import * as Sentry from '@sentry/browser';
import configureStore from '../redux/store/index';
import registerServiceWorker from './register-service-worker';
import Routes from './routes/index';

// Components
import Loading from './components/Loading';
// persistor.purge(); // Debug to clear persist

// Sentry

// Load css
require('./styles/style.scss');

const { persistor, store } = configureStore();

// sentry for live bug reporting
Sentry.init({ dsn: 'https://3328a2115ba242c4a0f50fb5107b1513@sentry.io/1296250' });

const rootElement = document.getElementById('root');

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <Routes />
      </Router>
    </PersistGate>
  </Provider>
);

render(<Root />, rootElement);
registerServiceWorker();
