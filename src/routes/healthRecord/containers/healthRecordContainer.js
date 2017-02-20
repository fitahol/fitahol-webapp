import { connect } from 'react-redux'
import { fetchList, modalOpen, modalClose, directTo, valChange } from '../../../actions'

import healthRecordEle from '../components'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url),
	valChange: (key, val) => valChange(key, val)
}

const mapStateToProps = (state) => ({
	modal: state.healthRecord.modal,
	modalState: state.healthRecord.modalState,
	healthRecordList: state.healthRecord.healthRecordList
})

export default connect(mapStateToProps, mapActionCreators)(healthRecordEle)
