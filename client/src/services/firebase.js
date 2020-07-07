import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/storage'

import { firebaseConfig } from './firebase-keys'

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
