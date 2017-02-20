
import { injectReducer } from '../../reducers'

import login from './containers/loginContainer'
import reducer from './modules/login'

export default (store, cb) => {
	injectReducer(store, { key: 'login', reducer })
	cb(null, login)
}
