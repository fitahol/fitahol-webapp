/**
 * Created by madeling on 8/1/16.
 */
import { globalHandler } from '../../../reducers'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	submitInfo: { detail: '' },
	modalState: false,
	modal: {},
	UType: +localStorage.getItem('uType') || 1,
	canSubmit: false
}

export default function loginReducer(state = initialState, action) {
	if (location.pathname !== '/login') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
