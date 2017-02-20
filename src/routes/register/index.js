
import { injectReducer } from '../../reducers'

import register from './containers/registerContainer'
import reducer from './modules/register'

export default (store, cb) => {
	injectReducer(store, { key: 'register', reducer })
	cb(null, register)
}
