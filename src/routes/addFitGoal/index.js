import { injectReducer } from '../../reducers'

import addCourse from './containers/addFitGoalContainer'
import reducer from './modules/addFitGoal'
import './addFitGoal.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'addFitGoal', reducer })
	cb(null, addCourse)
}
