import React from 'react';
import { Root, StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import getTheme from './native-base-theme/components';
import platformTheme from './native-base-theme/variables/platform';

import { store, persistor } from './shared/redux/store';

// import { Font } from 'expo';
// import Roboto from 'native-base/Fonts/Roboto.ttf';
// import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';

import Router from './src/router';
import LoadingScreen from './src/screens/Loading';

export default class App extends React.Component {
  // async componentWillMount() {
  //   Don's use the font but leaving here to show how to
  //   try {
  //     await Font.loadAsync({
  //       Roboto,
  //       Roboto_medium: RobotoMedium,
  //     });
  //     this.setState({ loading: false });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <StyleProvider style={getTheme(platformTheme)}>
            <Root>
              <Router />
            </Root>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
