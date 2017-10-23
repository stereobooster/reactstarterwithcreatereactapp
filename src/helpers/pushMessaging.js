import {messaging} from 'config/constants'

export async function requestMessegingPermission() {
  try {
    const messagingPermisson = await messaging.requestPermission()
    console.log('Notification permission granted.')
    getMessegingToken()
  } catch (err) {
    console.log('Unable to get permission to notify.', err)
    // // // update in firebase database
    return err
  }
}

export async function getMessegingToken() {
  try {
    const FCMToken = await messaging.getToken()
    console.log('FCMToken: ', FCMToken)
    // // // update in firebase database
  } catch (err) {
    console.log(err)
    return err
  }
}

export function handleInAppMessages(payload) {
  // // // currently just console logging the  Foreground message but can use other libs to display
  console.log('PUSH MESSAGE RECEIVED: ', payload)
}
