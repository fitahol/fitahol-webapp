import { connect } from 'react-redux'

import IndexCompentent from '../components/index'
import { fetchList, valChange, directTo, modalOpen, modalClose } from '../../../actions'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter),
	valChange: (key, val) => valChange(key, val),
	modalClose: () => modalClose(),
	modalOpen: (payload) => modalOpen(payload),
	directTo: (url) => directTo(url)
}

const mapStateToProps = (state) => ({
	modal: state.courseCharts.modal,
	modalState: state.courseCharts.modalState,
	courseChartsData: state.courseCharts.courseChartsData
})

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
