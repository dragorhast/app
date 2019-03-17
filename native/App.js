import React from 'react';
import { Root, StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ThemeProvider } from 'styled-components';
import getTheme from './native-base-theme/components';
import platformTheme from './native-base-theme/variables/platform';
import Theme from './src/styles/styledComponentTheme';

import { store, persistor } from './shared/redux/store';

import MyRoutes from './src';
import LoadingScreen from './src/screens/LoadingScreen';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <ThemeProvider theme={Theme}>
            <StyleProvider style={getTheme(platformTheme)}>
              <Root>
                <MyRoutes />
              </Root>
            </StyleProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}
