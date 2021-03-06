import {
	globalHandler
} from '../../../reducers'
import { rootPath } from '../../config'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	modal: {},
	modalState: false,
	healthRecordList: []
}

export default function homeReducer(state = initialState, action) {
	if (location.pathname !== `${rootPath}/health-record`) return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
