import { connect } from 'react-redux'
import { fetchList, modalOpen, modalClose, directTo, valChange } from '../../../actions'

import addActionEle from '../components'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url),
	valChange: (val, key) => valChange(val, key)
}

const mapStateToProps = (state) => ({
	categoryInfo: state.addAction.categoryInfo,
	categoryChildInfo: state.addAction.categoryChildInfo,
	addActionResult: state.addAction.addActionResult,
	rootSelectIndex: state.addAction.rootSelectIndex,
	drawerStatus: state.addAction.drawerStatus,
	currenAction: state.addAction.currenAction,
	modal: state.addAction.modal,
	modalState: state.addAction.modalState
})

export default connect(mapStateToProps, mapActionCreators)(addActionEle)
