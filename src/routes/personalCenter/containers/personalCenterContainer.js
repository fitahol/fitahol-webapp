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
	modal: state.personalCenter.modal,
	modalState: state.personalCenter.modalState,
	userInfo: state.personalCenter.userInfo,
	gender: state.personalCenter.gender,
	largePortraitShow: state.personalCenter.largePortraitShow,
	choosePortraitInfo: state.personalCenter.choosePortraitInfo,
	editorStatus: state.personalCenter.editorStatus
})

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
