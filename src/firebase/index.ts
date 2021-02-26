import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { firebaseConfig } from './config'

// initialSizeを複数回走らせない
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export const functions = firebase.functions()
export const FirebaseTimestamp = firebase.firestore.Timestamp