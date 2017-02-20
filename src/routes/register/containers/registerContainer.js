import { connect } from 'react-redux'
import { fetchList, directTo, modalClose, modalOpen, valChange } from '../../../actions'

import RegisterEle from '../components/register'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	directTo: (url) => directTo(url),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	valChange: (val, key) => valChange(val, key)
}

const mapStateToProps = (state) => ({
	submitInfo: state.register.submitInfo,
	modalState: state.register.modalState,
	modal: state.register.modal,
	canSubmit: state.register.canSubmit,
	disableCodeSend: state.register.disableCodeSend,
	codeInfo: state.register.codeInfo,
	isLoading: state.register.isLoading
})

export default connect(mapStateToProps, mapActionCreators)(RegisterEle)
