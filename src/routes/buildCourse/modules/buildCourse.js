import {
	globalHandler
} from '../../../reducers'
// import { rootPath } from '../../config'

const ACTION_HANDLERS = {
	...globalHandler
}

const initialState = {
	modal: {},
	modalState: false,
	startTime: '',
	endTime: '',
	endRepeatTime: '',
	repeatTimes: 0,
	repeatCourseType: 0,
	courseType: 1,
	ruleInfo: [],
	queryID: '',
	chooseWeekIndex: [],
	selectData: []
}

export default function homeReducer(state = initialState, action) {
	if (location.pathname !== '/build-course') return state
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
