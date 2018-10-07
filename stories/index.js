import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Home from '../src/web/components/Home';

storiesOf('Home', module)
  .add('As is', () => (
    <Home />
  ));
