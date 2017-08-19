import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import reduxThunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import {autoRehydrate, persistStore} from 'redux-persist'
import {REHYDRATE} from 'redux-persist/constants'
import createFilter from 'redux-persist-transform-filter'
import Loading from 'components/Loading'
import createActionBuffer from 'redux-action-buffer'
import createMigration from 'redux-persist-migrate'
import * as reducers from 'redux/modules'
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import localforage from 'localforage'

// import { LOGGING_OUT } from './redux/modules/authentication'

const rootReducer = combineReducers({...reducers, navigation: routerReducer})

// // Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history)

// /////////////////////////////////////////////////////
// // UnComment If need to Reset Entire Redux Store to Intial Values if Logging Out at once
//   // this function(reducer) run at all action calls and
//   // checks if action type is LOGGING_OUT if so it sets state of all reducers to undefined, thus that sets them back to intial defined state
// function rootReducer(state, action) {
//   if (action.type === LOGGING_OUT) {
//     state = undefined
//   }
//   // if the action is not LOOGING_OUT nothing happens the appReducer just gets passed through to crearting a store
//   return appReducer(state, action)
// }

// ///////////////////////////////////////////////////

const manifest = {
  1: state => ({...state, staleReducer: undefined}),
  2: state => ({...state, app: {...state.app, staleKey: undefined}}),
}

// //reducerKey is the key of the reducer you want to store the state version in
// //in this example after migrations run `state.app.version` will equal `2`
const reducerKey = 'app'
const migration = createMigration(manifest, reducerKey)

// for saving subset of events reducer : ignoring everything else
const saveSubsetFilterA = createFilter('authentication', [
  'authed',
  'authedId',
  'authedUser',
])

// // Add the reducer to your store on the `router` key
// // Also apply our middleware for navigating
export const store = createStore(
  rootReducer,
  compose(
    migration,
    autoRehydrate(),
    applyMiddleware(
      reduxThunk,
      createActionBuffer(REHYDRATE),
      historyMiddleware
    ),
    window.devToolsExtension && process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension()
      : f => f
  )
)

// // Now you can dispatch navigation actions from anywhere!
// // store.dispatch(push('/foo'))

persistStore(
  store,
  {
    storage: localforage,
    blacklist: ['form', 'navigation'],
    transforms: [saveSubsetFilterA],
  },
  () => {
    console.log('rehydration complete')
  }
)
