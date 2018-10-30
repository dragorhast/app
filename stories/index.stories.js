import React from 'react';
import { storiesOf } from '@storybook/react';
import Home from '../src/web/components/Home';

import HomeContainer from '../src/native/native-containers/Home';
import HomeComponent from '../src/native/components/Home';

import '../src/web/styles/style.scss';
import '../src/web/styles/_bootstrap.scss';

storiesOf('Home', module).add('As is', () => <Home />);

// storiesOf('Native Pages', module).add('Home', () => <HomeContainer layout={HomeComponent} />);
