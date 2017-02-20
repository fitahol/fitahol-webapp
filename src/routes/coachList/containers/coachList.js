import { connect } from 'react-redux'

import IndexCompentent from '../components'
import { fetchList } from '../../../actions'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter)
}

const mapStateToProps = (state) => ({ coachListData: state.coachList.coachListData })

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
