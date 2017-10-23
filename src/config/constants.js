import firebase from 'firebase'
import {handleInAppMessages} from 'helpers/pushMessaging'

// // USE THIS CONFIG FOR PRODUCTION DEPLOY
export const config = {
  apiKey: 'AIzaSyB61KkRgqH19gOfgUsew8DHxDklisEnyms',
  authDomain: 'reactstarterwithcreatereactapp.firebaseapp.com',
  databaseURL: 'https://reactstarterwithcreatereactapp.firebaseio.com',
  projectId: 'reactstarterwithcreatereactapp',
  storageBucket: 'reactstarterwithcreatereactapp.appspot.com',
  messagingSenderId: '320874865933',
}

// // USE THIS CONFIG FOR STAGING APP PREPRODUCTION
// export const config = {

// }

firebase.initializeApp(config)

// Get a reference to the database service
export const database = firebase.database()
export const firebaseAuth = firebase.auth()
export const messaging = firebase.messaging()
export const firebaseRef = firebase.database().ref()

messaging.onMessage(payload => {
  handleInAppMessages(payload)
})

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then(refreshedToken => {
      console.log('Token refreshed.', refreshedToken)
      // // // update in firebase database
    })
    .catch(err => {
      console.log('Unable to retrieve refreshed token ', err)
      // // // update in firebase database
    })
})
