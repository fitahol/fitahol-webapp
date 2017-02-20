import { connect } from 'react-redux'

import IndexCompentent from '../components/index'
import { fetchList } from '../../../actions'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter)
}

const mapStateToProps = (state) => ({ notify: state.message.notify })

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
