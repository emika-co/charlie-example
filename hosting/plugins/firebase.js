import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/performance'
import 'firebase/remote-config'

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebaseConfig)
}

export const auth = firebase.auth
export const firestore = firebase.firestore
export const firebaseAnalytics = firebase.analytics
export const storage = firebase.storage
export const performance = firebase.performance
export const remoteConfig = firebase.remoteConfig
export default firebase
