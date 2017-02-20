import { connect } from 'react-redux'
import { fetchList, modalOpen, modalClose, directTo, valChange } from '../../../actions'

import addGoalRecordElt from '../components'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url),
	valChange: (key, val) => valChange(key, val)
}

const mapStateToProps = (state) => ({
	modal: state.addGoalRecord.modal,
	modalState: state.addGoalRecord.modalState,
	fitGoalInfo: state.addGoalRecord.fitGoalInfo,
	addResultInfo: state.addGoalRecord.addResultInfo,
	upDateStatus: state.addGoalRecord.upDateStatus,
	adGoalTime: state.addGoalRecord.adGoalTime
})

export default connect(mapStateToProps, mapActionCreators)(addGoalRecordElt)
