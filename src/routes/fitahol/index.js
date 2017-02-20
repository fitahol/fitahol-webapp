import { injectReducer } from '../../reducers'

import fitahol from './containers/fitaholContainer'
import reducer from './modules/fitahol'

export default (store, cb) => {
	injectReducer(store, { key: 'fitahol', reducer })
	cb(null, fitahol)
}
