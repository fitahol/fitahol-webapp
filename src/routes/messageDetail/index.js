
import { injectReducer } from '../../reducers'

import MessageDetail from './containers/messageDetailContainer'
import reducer from './modules/msgDetail'

export default (store, cb) => {
	injectReducer(store, { key: 'msgDetail', reducer })
	cb(null, MessageDetail)
}
