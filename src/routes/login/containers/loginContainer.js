import { connect } from 'react-redux'
import { fetchList, directTo, modalClose, modalOpen, valChange } from '../../../actions'

import LoginEle from '../components'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	directTo: (url) => directTo(url),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	valChange: (val, key) => valChange(val, key)
}

const mapStateToProps = (state) => ({
	submitInfo: state.login.submitInfo,
	modalState: state.login.modalState,
	UType: state.login.UType,
	modal: state.login.modal,
	canSubmit: state.login.canSubmit
})

export default connect(mapStateToProps, mapActionCreators)(LoginEle)
