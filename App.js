import React from 'react';
import Sentry from 'sentry-expo';
import Root from './src/native/index';
import configureStore from './src/redux/store/index';

// storybook
// import StorybookUI from './.storybook';

// sentry error reporting
// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;

Sentry.config('https://3328a2115ba242c4a0f50fb5107b1513@sentry.io/1296250').install();

const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
  // return StorybookUI;
}
