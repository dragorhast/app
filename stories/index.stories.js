import React from 'react';
import { storiesOf } from '@storybook/react';
import Home from '../src/web/components/Home';

import '../src/web/styles/style.scss';
import '../src/web/styles/_bootstrap.scss';

storiesOf('Home', module).add('As is', () => <Home />);
