/**
 * Created by madeling on 8/1/16.
 */
 import { globalHandler } from '../../../reducers'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	userInfo: {},
	modal: {},
	modalState: false
}

export default function profileReducer(state = initialState, action) {
	if (location.pathname !== '/account') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
