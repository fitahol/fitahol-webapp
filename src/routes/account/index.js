import { injectReducer } from '../../reducers'

import account from './containers/accountContainer'
import reducer from './modules/profile'

export default (store, cb) => {
	injectReducer(store, { key: 'account', reducer })
	cb(null, account)
}
