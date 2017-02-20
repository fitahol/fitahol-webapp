
import { injectReducer } from '../../reducers'

import iforget from './containers/iforgetContainer'
import reducer from './modules/iforget'

export default (store, cb) => {
	injectReducer(store, { key: 'iforget', reducer })
	cb(null, iforget)
}
