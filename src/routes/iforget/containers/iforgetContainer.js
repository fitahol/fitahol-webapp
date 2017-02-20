import { connect } from 'react-redux'
import { fetchList, directTo, modalClose, modalOpen, valChange } from '../../../actions'

import iForgetEle from '../components/iforget'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	directTo: (url) => directTo(url),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	valChange: (val, key) => valChange(val, key)
}

const mapStateToProps = (state) => ({
	submitInfo: state.iforget.submitInfo,
	modalState: state.iforget.modalState,
	modal: state.iforget.modal,
	canSubmit: state.iforget.canSubmit,
	disableCodeSend: state.iforget.disableCodeSend,
	codeInfo: state.iforget.codeInfo,
	isLoading: state.iforget.isLoading
})

export default connect(mapStateToProps, mapActionCreators)(iForgetEle)
