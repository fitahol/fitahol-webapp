
import { injectReducer } from '../../reducers'

import resetPhone from './containers/resetPhoneContainer'
import reducer from './modules/resetPhone'

export default (store, cb) => {
	injectReducer(store, { key: 'resetPhone', reducer })
	cb(null, resetPhone)
}
