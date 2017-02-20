import { connect } from 'react-redux'

import indexEle from '../components/index'
import { fetchList } from '../../../actions'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter)
}

const mapStateToProps = (state) => ({ response: state.msgDetail.response })

export default connect(mapStateToProps, mapActionCreators)(indexEle)
