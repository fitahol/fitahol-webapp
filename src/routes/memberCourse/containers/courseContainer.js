import { connect } from 'react-redux'

import IndexCompentent from '../components/index'
import { fetchList, valChange, directTo, modalOpen, modalClose } from '../../../actions'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	valChange: (key, val) => valChange(key, val),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url)
}

const mapStateToProps = (state) => ({
	modal: state.course.modal,
	modalState: state.course.modalState,
	courseRecord: state.course.courseRecord,
	lastCourseInfo: state.course.lastCourseInfo,
	editorIndex: state.course.editorIndex,
	purchasedCourseData: state.course.purchasedCourseData,
	modifyResult: state.course.modifyResult
})

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
