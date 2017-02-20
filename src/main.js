import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import AppContainer from './containers/App'
import rootSaga from './sagas'
import configureStore from './store'
import enterRouter from './routes/index'
const initialState = {}

const store = configureStore(initialState, browserHistory)
window.store = store
store.runSaga(rootSaga)

const history = syncHistoryWithStore(browserHistory, store, {
	selectLocationState: (state) => state.router
})

const MOUNT_NODE = document.getElementById('root')

const render = (routerKey = null) => {
	const routes = enterRouter(store)
	ReactDOM.render(
		<AppContainer
			store={store}
			history={history}
			routes={routes}
			routerKey={routerKey}
		/>,
	MOUNT_NODE
	)
}

render()
