import { connect } from 'react-redux'
import { fetchList, modalOpen, modalClose, directTo, valChange } from '../../../actions'

import buildCourseEle from '../components'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url),
	valChange: (key, val) => valChange(key, val)
}

const mapStateToProps = (state) => ({
	modal: state.buildCourse.modal,
	modalState: state.buildCourse.modalState,
	startTime: state.buildCourse.startTime,
	endTime: state.buildCourse.endTime,
	endRepeatTime: state.buildCourse.endRepeatTime,
	repeatTimes: state.buildCourse.repeatTimes,
	repeatCourseType: state.buildCourse.repeatCourseType,
	courseType: state.buildCourse.courseType,
	ruleInfo: state.buildCourse.ruleInfo,
	queryID: state.buildCourse.queryID,
	chooseWeekIndex: state.buildCourse.chooseWeekIndex,
	selectData: state.buildCourse.selectData
})

export default connect(mapStateToProps, mapActionCreators)(buildCourseEle)
