import { connect } from 'react-redux'

import IndexCompentent from '../components'
import { fetchList, valChange, modalOpen, modalClose, directTo } from '../../../actions'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	valChange: (key, val) => valChange(key, val),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url)
}

const mapStateToProps = (state) => ({
	addMemberInfo: state.addMember.addMemberInfo,
	modal: state.addMember.modal,
	modalState: state.addMember.modalState,
	selectData: state.addMember.selectData,
	queryID: state.addMember.queryID,
	queryResultData: state.addMember.queryResultData
})

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
