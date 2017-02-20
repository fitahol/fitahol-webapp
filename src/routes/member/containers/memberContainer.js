import { connect } from 'react-redux'

import IndexCompentent from '../components'
import { fetchList } from '../../../actions'

const mapActionCreators = {
	fetchList: (url, options, key, filter) => fetchList(url, options, key, filter)
}

const mapStateToProps = (state) => ({ memberList: state.member.memberList })

export default connect(mapStateToProps, mapActionCreators)(IndexCompentent)
