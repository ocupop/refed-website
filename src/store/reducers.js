import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

import asyncReducer from '../features/async/asyncReducer'
import modalReducer from '../features/modal/modalReducer'
// import testReducer from '../features/sandbox/testReducer';

const rootReducer = () =>
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    toastr: toastrReducer,
    async: asyncReducer,
    modals: modalReducer
    // test: testReducer,
  })

export default rootReducer
