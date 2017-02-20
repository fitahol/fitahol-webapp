import { injectReducer } from '../../reducers'

import addGoalRecord from './containers/addGoalRecordContainer'
import reducer from './modules/addGoalRecord'
import './addGoalRecord.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'addGoalRecord', reducer })
	cb(null, addGoalRecord)
}
