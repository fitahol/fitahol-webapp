import {
	globalHandler
} from '../../../reducers'

// import $storage from '../../../services/storage'
// import { rootPath } from '../../config'
import moment from 'moment'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	modal: {},
	modalState: false,
	currentDateInfo: '',
	weekTitleInfo: [],
	dateTitleInfo: [],
	actualWeekMoment: moment(),
	hasClickItem: false,
	hasClickItemInfo: {
		hourItem: '',
		hourSpaceIndex: 0
	},
	swipeIndex: 1,
	fitaholData: [],
	hasScroll: false,
	currentMonthTheme: 0
}

export default function taskReducer(state = initialState, action) {
	if (location.pathname !== '/') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
