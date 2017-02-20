import { globalHandler } from '../../../reducers'
import { urlPathParse } from '../../../services/util'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	modal: {},
	modalState: false,
	courseChartsData: {}
}

export default function profileReducer(state = initialState, action) {
	const pathname = urlPathParse(location.pathname)
	if (pathname !== 'course-charts') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
