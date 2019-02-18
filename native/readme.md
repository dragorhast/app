### Conventions

#### Redux
Using [Ducks](https://github.com/erikras/ducks-modular-redux) modular convention

Inside every duck file is:
- Actions
- Initial State
- Prop-Types (if applicable)
- Reducer
- Action Creators
- Async calls (redux-thunk)
- Selectors (if applicable)

the reducer will be the default export

Naming Conventions:
- Actions - NOUN_VERB - TODO_SET
- Action Creators - verbNoun - setTodo
- Selector - getNoun - getTodo

Selectors are used for  altering data, good video for how to create them found [here](https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers)

### Firebase + Authentication

The only information about a user that is stored on the tap2go api that is useful to us other than what is already on the db is the users id in the database

This is useful to for some api routes.

The options for saving information for a user on their profile is limited to:
- displayName
- email
- phoneNumber
- photoURL

We do not currently save a photo for them any where so I think photoUrl is a good place to hold this db id.

This will be set on signup based on the return from the [Tap2Go python api](https://github.com/dragorhast/server)


