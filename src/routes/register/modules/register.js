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
	isLoading: false,
	codeInfo: {
		isCounting: false,
		delay: 59,
		code: 0
	},
	canSubmit: false,
	disableCodeSend: false
}

export default function loginReducer(state = initialState, action) {
	if (location.pathname !== '/register') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
