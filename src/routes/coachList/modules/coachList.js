import { globalHandler } from '../../../reducers'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = { coachListData: [] }

export default function profileReducer(state = initialState, action) {
	if (location.pathname !== '/coach-list') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
