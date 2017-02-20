/**
 * Created by madeling on 8/1/16.
 */
import { globalHandler } from '../../../reducers'

const ACTION_HANDLERS = {
	...globalHandler
}

// const initialState = { daily_ranking: {}, week_ranking: {}, total_ranking: {} }

const initialState = { memberList: [] }

export default function profileReducer(state = initialState, action) {
	if (location.pathname !== '/member') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
