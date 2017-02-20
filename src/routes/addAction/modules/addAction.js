import {
	globalHandler
} from '../../../reducers'
import { rootPath } from '../../config'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	categoryInfo: [],
	categoryChildInfo: [],
	addActionResult: {},
	rootSelectIndex: -1,
	currenAction: {},
	drawerStatus: false,
	modal: {},
	modalState: false
}

export default function addActionReducer(state = initialState, action) {
	if (location.pathname !== `${rootPath}/add-action`) return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
