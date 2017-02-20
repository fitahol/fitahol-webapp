/**
 * Created by madeling on 8/1/16.
 */
import { globalHandler } from '../../../reducers'
import { urlPathParse } from '../../../services/util'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	modal: {},
	modalState: false,
	fitGoal: [],
	lastCourseInfo: {}
}

export default function profileReducer(state = initialState, action) {
	const pathname = urlPathParse(location.pathname)
	if (pathname !== 'member-health') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
