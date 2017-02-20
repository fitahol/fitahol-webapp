import { globalHandler } from '../../../reducers'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	modal: {},
	modalState: false,
	addMemberInfo: {},
	selectData: [],
	queryID: '',
	queryResultData: []
}

export default function profileReducer(state = initialState, action) {
	if (location.pathname !== '/add-member') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
