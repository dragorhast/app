import React from 'react';
import Root from './src/native/index';
import configureStore from './src/redux/store/index';

// storybook
import StorybookUI from './.storybook';

const { persistor, store } = configureStore();

export default function App() {
  // return <Root store={store} persistor={persistor} />;
  return StorybookUI;
}
