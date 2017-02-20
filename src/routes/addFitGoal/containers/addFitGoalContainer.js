import { connect } from 'react-redux'
import { fetchList, modalOpen, modalClose, directTo, valChange } from '../../../actions'

import addFitGoalEle from '../components'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url),
	valChange: (key, val) => valChange(key, val)
}

const mapStateToProps = (state) => ({
	modal: state.addFitGoal.modal,
	modalState: state.addFitGoal.modalState,
	fitGoalInfo: state.addFitGoal.fitGoalInfo,
	addResultInfo: state.addFitGoal.addResultInfo,
	upDateStatus: state.addFitGoal.upDateStatus
})

export default connect(mapStateToProps, mapActionCreators)(addFitGoalEle)
