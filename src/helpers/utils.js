export function serviceWorkerCheck() {
  if (('serviceWorker' in navigator && window.location.protocol === 'https:')) {
    // Are Notifications supported in the service worker?
    if (
      !('showNotification' in ServiceWorkerRegistration.prototype) ||
      Notification.permission === 'denied' ||
      !('PushManager' in window)
    ) {
      console.warn(
        "Notifications aren't supported OR The user has blocked notifications"
      )
      return '0'
    } else if (Notification.permission === 'default') {
      return '1A'
    } else {
      return '1'
    }
  } else {
    console.warn('Service Worker is not supoorted in the browser')
    return '0'
  }
}
