import { connect } from 'react-redux'
import { fetchList, modalOpen, modalClose, directTo, valChange } from '../../../actions'
import fitaholEle from '../components'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	modalOpen: (payload) => modalOpen(payload),
	modalClose: () => modalClose(),
	directTo: (url) => directTo(url),
	valChange: (key, val) => valChange(key, val)
}

const mapStateToProps = (state) => ({
	modal: state.fitahol.modal,
	modalState: state.fitahol.modalState,
	currentDateInfo: state.fitahol.currentDateInfo,
	weekTitleInfo: state.fitahol.weekTitleInfo,
	dateTitleInfo: state.fitahol.dateTitleInfo,
	actualWeekMoment: state.fitahol.actualWeekMoment,
	hasClickItem: state.fitahol.hasClickItem,
	hasClickItemInfo: state.fitahol.hasClickItemInfo,
	swipeIndex: state.fitahol.swipeIndex,
	fitaholData: state.fitahol.fitaholData,
	hasScroll: state.fitahol.hasScroll,
	currentMonthTheme: state.fitahol.currentMonthTheme
})

export default connect(mapStateToProps, mapActionCreators)(fitaholEle)
