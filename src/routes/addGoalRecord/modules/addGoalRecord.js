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
	upDateStatus: false,
	adGoalTime: ''
}

export default function homeReducer(state = initialState, action) {
	const pathname = urlPathParse(location.pathname)
	if (pathname !== 'add-goal-record') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
