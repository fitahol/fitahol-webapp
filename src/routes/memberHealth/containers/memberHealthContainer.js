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
	modal: state.memberHealth.modal,
	modalState: state.memberHealth.modalState,
	fitGoal: state.memberHealth.fitGoal,
	lastCourseInfo: state.memberHealth.lastCourseInfo
})

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
