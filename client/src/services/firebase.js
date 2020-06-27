import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'

import { firebaseConfig } from './firebase-keys'

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
