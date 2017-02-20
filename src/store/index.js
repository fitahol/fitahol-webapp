import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(initialState = {}, history) {
	const sagaMiddleware = createSagaMiddleware()
	const store = createStore(
		rootReducer(),
		initialState,
		compose(
			applyMiddleware(...[routerMiddleware(history), sagaMiddleware])
			// window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	)
	store.asyncReducers = {}
	return {
		...store,
		runSaga: sagaMiddleware.run
	}
}
