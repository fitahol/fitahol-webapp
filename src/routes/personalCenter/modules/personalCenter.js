import { globalHandler } from '../../../reducers'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	modal: {},
	modalState: false,
	userInfo: {},
	gender: 0,
	largePortraitShow: false,
	choosePortraitInfo: '',
	editorStatus: false
}

export default function profileReducer(state = initialState, action) {
	if (location.pathname !== '/personal-center') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
