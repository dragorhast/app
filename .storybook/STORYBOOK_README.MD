### What is Storybook

It allows you test the visible view of React's component files.

Often if you write a visible component its hard to visualise how it will look

Storybook runs its own little server on your computer that allows you to create "stories" which will display the components you have put in the story in the broswer

### How to start story book

In the termal in folder app root folder

``` bash
npm run storybook
```

Then open your browser and open page

[http://localhost:6006/](http://localhost:6006/)


### How to create stories

In file"
``` bash
/stories/index.stories.js
```

You wan to add code like the below

``` js

import Home from '../src/web/components/Home';

import '../src/web/styles/style.scss';
import '../src/web/styles/_bootstrap.scss';

storiesOf('Main Home', module)
  .add('As is', () => (
    <Home />
  ));
 ```

 The above will add a main header to the left named "Main Home" on the left of storybook

 It will add a sub heading named "As is"

 When "As is" is clicked the component <Home /> will be rendered with the necessary scss attached

#### Note
 - Put all component imports at the top of the file
 - If it doesn't look right make sure the correct styling is added
 - Make sure the component has all props added that are required

