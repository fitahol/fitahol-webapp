
import { injectReducer } from '../../reducers'

import coachList from './containers/coachList'
import reducer from './modules/coachList'
import './coachList.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'coachList', reducer })
	cb(null, coachList)
}
