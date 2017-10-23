import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {render as snapshotRender} from 'react-snapshot'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {configureStore, history} from './redux/store'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
// import { persistStore } from 'redux-persist'
// import createFilter from 'redux-persist-transform-filter'
// import Loading from 'components/Loading'
// const localforage = require('localforage')

// // for saving subset of events reducer : ignoring everything else
// const saveSubsetFilterA = createFilter(
//   'authentication',
//   ['authed', 'authedId', 'authedUser', 'fetching'],
// )

// export default class MainAppRenderingContainer extends Component {
//   constructor() {
//     super()
//     this.state = { rehydrated: false }
//   }

//   componentWillMount() {
//     persistStore(store, { storage: localforage,
//       blacklist: ['form', 'navigation'],
//       transforms: [saveSubsetFilterA] }, () => {
//         this.setState({ rehydrated: true })
//       })
//   }

//   componentDidMount() {
//       // do stuff while splash screen is shown
//       //   After having done stuff (such as async tasks) hide the splash screen
//   }

//      render () {
//        if (!this.state.rehydrated) {
//          return <Loading />
//        }
//        const elem = document.getElementById('intialLoading') // done this way beacuse internet explorer doesnt recognize remove function
//        elem ? elem.parentElement.removeChild(elem) : null
//        return (
//         <div>
//        <App />
//        </div>
//       )
//      }
// }

async function init() {
  const store = await configureStore()
  ReactDOM.render( 
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
}

init()
registerServiceWorker()
