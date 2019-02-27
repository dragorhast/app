import * as FirebaseModule from 'firebase';

import AppConfig from './config';

const fConfig = {
  apiKey: AppConfig.firebaseAPIKey,
  authDomain: 'dragorhast-420.firebaseapp.com',
  databaseURL: 'https://dragorhast-420.firebaseio.com',
  projectId: 'dragorhast-420',
  storageBucket: 'dragorhast-420.appspot.com',
  messagingSenderId: '548068431376',
};

let firebaseInitialized = false;

if (
  fConfig.apiKey !== 'null' &&
  fConfig.authDomain !== 'null' &&
  fConfig.databaseURL !== 'null' &&
  fConfig.storageBucket !== 'null' &&
  fConfig.messagingSenderId !== 'null'
) {
  FirebaseModule.initializeApp({
    apiKey: fConfig.apiKey,
    authDomain: fConfig.authDomain,
    databaseURL: fConfig.databaseURL,
    storageBucket: fConfig.storageBucket,
    messagingSenderId: fConfig.messagingSenderId,
  });

  firebaseInitialized = true;
}

export const Firebase = firebaseInitialized ? FirebaseModule : null;
// Database reference
export const FirebaseRef = firebaseInitialized ? FirebaseModule.database().ref() : null;
// export const FirebaseAdmin = admin;
