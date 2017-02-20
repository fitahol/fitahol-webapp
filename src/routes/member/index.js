
import { injectReducer } from '../../reducers'

import member from './containers/memberContainer'
import reducer from './modules/member'
import './member.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'member', reducer })
	cb(null, member)
}
