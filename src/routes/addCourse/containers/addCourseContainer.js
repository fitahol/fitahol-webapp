import { connect } from 'react-redux'
import { fetchList, modalOpen, modalClose, directTo, valChange } from '../../../actions'

import addCourseEle from '../components'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url),
	valChange: (key, val) => valChange(key, val)
}

const mapStateToProps = (state) => ({
	modal: state.addCourse.modal,
	modalState: state.addCourse.modalState,
	addResult: state.addCourse.addResult
})

export default connect(mapStateToProps, mapActionCreators)(addCourseEle)
