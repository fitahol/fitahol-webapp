import { injectReducer } from '../../reducers'

import addAction from './containers/addActionContainer'
import reducer from './modules/addAction'
import './addAction.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'addAction', reducer })
	cb(null, addAction)
}
