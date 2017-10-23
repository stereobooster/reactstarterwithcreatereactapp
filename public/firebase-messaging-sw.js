// temporary measure, will not be necessary with release version.
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js')
// import firebase from 'firebase'
// require('firebase/messaging') // FCM SDK

firebase.initializeApp({
  'messagingSenderId': '320874865933'
})

const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(payload => {
  var notificationTitle = 'Default'
  var notificationOptions = {
    'body': 'Default message body.',
    'icon': 'default Icon url'
  }
  var inAppOnly = false
  console.log('received background message: ', payload)
  // Show notification here
  if ((typeof payload.data !== 'undefined')) {
    if (typeof payload.data.title !== 'undefined') {
      notificationTitle = payload.data.title
    }
    if (typeof payload.data.body !== 'undefined') {
      notificationOptions['body'] = payload.data.body
    }
    if (typeof payload.data.icon !== 'undefined') {
      notificationOptions['icon'] = payload.data.icon
    }
    if (typeof payload.data.inAppOnly !== 'undefined') {
      if ((payload.data.inAppOnly === true) || (payload.data.inAppOnly === 'true')) {
        inAppOnly = true
      }
    }
  }

  if (inAppOnly === true) { // checking if the payload has a inappOnly flag - if so dont show notification in background
    return null
  } else {
    return self.registration.showNotification(notificationTitle,
    notificationOptions) // if sending non-notification message this handles that message by showing the notification
  }
})