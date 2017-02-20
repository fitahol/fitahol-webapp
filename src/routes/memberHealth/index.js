
import { injectReducer } from '../../reducers'

import memberHealth from './containers/memberHealthContainer'
import reducer from './modules/memberHealth'
import './memberHealth.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'memberHealth', reducer })
	cb(null, memberHealth)
}
