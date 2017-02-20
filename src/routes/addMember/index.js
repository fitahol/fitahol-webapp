
import { injectReducer } from '../../reducers'

import addMember from './containers/addMemberContainer'
import reducer from './modules/addMember'
import './addMember.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'addMember', reducer })
	cb(null, addMember)
}
