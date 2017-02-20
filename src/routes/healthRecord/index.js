import { injectReducer } from '../../reducers'

import healthRecord from './containers/healthRecordContainer'
import reducer from './modules/healthRecord'
import './healthRecord.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'healthRecord', reducer })
	cb(null, healthRecord)
}
