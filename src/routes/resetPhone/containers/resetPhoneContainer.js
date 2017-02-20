import { connect } from 'react-redux'
import { fetchList, directTo, modalClose, modalOpen, valChange } from '../../../actions'

import resetPhoneEle from '../components/resetPhone'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	directTo: (url) => directTo(url),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	valChange: (val, key) => valChange(val, key)
}

const mapStateToProps = (state) => ({
	submitInfo: state.resetPhone.submitInfo,
	modalState: state.resetPhone.modalState,
	modal: state.resetPhone.modal,
	canSubmit: state.resetPhone.canSubmit,
	disableCodeSend: state.resetPhone.disableCodeSend,
	codeInfo: state.resetPhone.codeInfo,
	isLoading: state.resetPhone.isLoading
})

export default connect(mapStateToProps, mapActionCreators)(resetPhoneEle)
