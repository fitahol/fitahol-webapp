
import { injectReducer } from '../../reducers'

import personalCenter from './containers/personalCenterContainer'
import reducer from './modules/personalCenter'
import './personalCenter.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'personalCenter', reducer })
	cb(null, personalCenter)
}
