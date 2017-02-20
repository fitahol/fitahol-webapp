import { injectReducer } from '../../reducers'

import courseRecord from './containers/courseRecordContainer'
import reducer from './modules/courseRecord'
import './courseRecord.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'courseRecord', reducer })
	cb(null, courseRecord)
}
