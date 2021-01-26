import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/performance'
import 'firebase/remote-config'

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebaseConfig)
}

if (process.env.environment !== 'production') {
  firebase.auth().useEmulator('http://localhost:9099')
  firebase.functions().useEmulator('localhost', 5001)
  firebase.firestore().useEmulator('localhost', 8080)
}

export const auth = firebase.auth
export const functions = firebase.app().functions('asia-southeast2')
export const firestore = firebase.firestore()
export const firebaseAnalytics = firebase.analytics
export const storage = firebase.storage
export const performance = firebase.performance
export const remoteConfig = firebase.remoteConfig
export default firebase
