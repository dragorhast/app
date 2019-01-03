# Dragorhast App

[![Build Status](https://img.shields.io/travis/dragorhast/app.svg?style=flat-square)](https://travis-ci.org/dragorhast/app)
[![GitHub License](https://img.shields.io/github/license/dragorhast/app.svg?style=flat-square)](https://github.com/dragorhast/app/blob/master/license.md)
![Typescript Version](https://img.shields.io/badge/typescript-3.0%2B-blue.svg?style=flat-square)
[![GitHub issues](https://img.shields.io/github/issues/dragorhast/app.svg?style=flat-square)](https://github.com/dragorhast/app/issues)

The app repository contains the web app as well as the android / ios apps. The app has all the day-to-day functionality needed
of the booking app from reservations to admin management.

## Building & Installing

Building the web app is handled by webpack. Simply run the required command to build:

    yarn
    yarn android
    yarn ios
    yarn web-bundle

Then, simply install the app or deploy the bundle to your server of choice and point it to an instance of the
[dragorhast/server](https://github.com/dragorhast/server).

## Development

To develop locally... todo

### Testing

Testing is done with Jest

To write a test create a folder names ```__tests__``` in the same folder as the component or function.

Then to write function like example below

``` javascript
import { sum } from './sum;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

#### BDD

Using jest-bdd we can right behavioural tests that all follow the format of:
- GIVEN - certain imputs
- WHEN - in a certain state
- THEN - receieve such output

There is also a concept of "rules" in jest-bdd but that can looked up at [https://github.com/konnorandrews/jest-bdd]

Exmaple below:

``` javascript
const { unit, given, when, then } = require('jest-bdd')

    unit(
      given('two numbers', () => {
        scope.num1 = 3
        scope.num2 = 8
      },
        then('num1 is 3', () => { // check the setup
          expect(num1).toBe(3)
        }),
        when('the numbers are added', () => { // perform the action to test
          scope.sum = num1 + num2
        },
          then('the sum is 11', () => { // check the result of the action
            expect(sum).toBe(11)
          })
        )
      )
    )

    Output:
      Given: two numbers
        ✓ Then: num1 is 3
        When: the numbers are added
          ✓ Then: the sum is 11
```

---

### Linting

This project uses eslint and prettier to ensure that the code is consistent.

## Redux

All interaction with Redux is done through containers.

Containers can be shared across app and web.

This means that every component/route that interacts with Redux must have a container then the platform specific component

The platform specific component is always the "Layout" prop on the route which is then passed as props to the container

### Examples of how routes conncet to redux

#### Native App
``` javscript
<Scene
      hideNavBar
      key="homeLogin"
      title="LOGIN"
      {...DefaultProps.navbarProps}
      component={LoginContainer}
      Layout={LoginComponent}
    />
```

#### Web App
``` javscript
<Route
      path="/update-profile"
      render={props => (
        <TemplateSidebar>
          <UpdateProfileContainer {...props} Layout={UpdateProfileComponent} />
        </TemplateSidebar>
      )}
    />
```


## Native App

### Styling

Native base framework is utilsied to make designing easier.

Applies styling for iOS and Android for things like buttons

Styles of components can be edited through the **native-base-theme** folder in the root of the project

Some Notes on how to use it below

#### Using components
Just like any npm module.

Find the component you want on the native base [site](http://docs.nativebase.io/Components.html)

Then import like:
``` javascript
import { Container, Content, Button } from native-base
```

#### Container

Every visual components must go inside a container.
Only 1 container allowed

#### Content
Every component can only have 1 content
It distinguishes the main body of the component from the header / footer

Often pass in padder as props to provide all round spacing


## Understanding the File Structure

- `/build` - Web server runs from here (we commit everything for Github pages)
- `/docs` - Github Repo Documentation
- `/firebase` - Firebase samples
- `/native-base-theme` - React Native's theme (by NativeBase)
- `/src` - Contains the source code for both web & native
    - `/actions` - Redux Actions - payloads of information that send data _from_ your application _to_ your store. [Read More &rarr;](https://redux.js.org/docs/basics/Actions.html)
    - `/constants` - Shared variables (across platforms)
    - `/containers` - 'Smart-components' that connect business logic to presentation [Read More &rarr;](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components)
    - `/images` - Images shared across platforms
    - `/lib` - Utils and custom libraries that are shared across platforms
    - `/native` - React Native specific code
        - `/components` - 'Dumb-components' / presentational. [Read More &rarr;](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
        - `/constants` - Native-specific variables and config
        - `/routes`- wire up the router with any & all screens [Read More &rarr;](https://github.com/aksonov/react-native-router-flux)
    - `/reducers`- Redux Reducers - Actions dispatch to reducers, which actually change the state [Read More &rarr;](https://redux.js.org/docs/basics/Reducers.html)
    - `/store`- Redux Store - hooks up the stores and provides initial/template states [Read More &rarr;](https://redux.js.org/docs/basics/Store.html)
    - `/web` - React-Web specific code
        - `/components` - 'Dumb-components' / presentational. [Read More &rarr;](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
        - `/routes`- wire up the router with any & all screens [Read More &rarr;](https://github.com/aksonov/react-native-router-flux)
        - `/styles`- all the SCSS you could dream of


