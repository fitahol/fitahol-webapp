import { connect } from 'react-redux'

import IndexCompentent from '../components/index'
import { fetchList, directTo, modalOpen, modalClose } from '../../../actions'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	directTo: (url) => directTo(url),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload)
}

const mapStateToProps = (state) => ({
	userInfo: state.account.userInfo,
	modal: state.account.modal,
	modalState: state.account.modalState
})

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
