/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; // stops rehydrate from overriding new keys,
import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native
import reducers from './ducks';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, // stops rehydrate from overriding new keys, see link below
  whitelist: [], // so chose what to persist
};

// if need mpre advanced control of persisted states see below:
// https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975

const persistedReducer = persistReducer(persistConfig, reducers);

// Puts all middleware in an array
const middleware = [thunk];

// Applys middleware and allows redux dev tools to work
export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
