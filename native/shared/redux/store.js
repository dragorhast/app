import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; // stops rehydrate from overriding new keys,
import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native
import reducers from './ducks';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, // stops rehydrate from overriding new keys, see link below
  whitelist: ['rental', 'pickups', 'locale', 'reserveCreate', 'bikes', 'bikeSingle'], // chose what to persist
};

// if need more advanced control of persisted states see below:
// https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975

const persistedReducer = persistReducer(persistConfig, reducers);

// Puts all middleware in an array
const middleware = [thunk];

// Applys middleware and allows redux dev tools to work
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));

export const persistor = persistStore(store);
