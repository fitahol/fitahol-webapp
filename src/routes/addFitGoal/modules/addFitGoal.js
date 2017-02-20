import {
	globalHandler
} from '../../../reducers'
import { urlPathParse } from '../../../services/util'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	modal: {},
	modalState: false,
	addResultInfo: {},
	fitGoalInfo: {},
	upDateStatus: false
}

export default function homeReducer(state = initialState, action) {
	const pathname = urlPathParse(location.pathname)
	if (pathname !== 'add-fitgoal') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
