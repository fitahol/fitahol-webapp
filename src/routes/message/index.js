
import { injectReducer } from '../../reducers'

import message from './containers/MessageContainer'
import reducer from './modules/message'

export default (store, cb) => {
	injectReducer(store, { key: 'message', reducer })
	cb(null, message)
}
