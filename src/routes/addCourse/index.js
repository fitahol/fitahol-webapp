import { injectReducer } from '../../reducers'

import addCourse from './containers/addCourseContainer'
import reducer from './modules/addCourse'
import './addCourse.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'addCourse', reducer })
	cb(null, addCourse)
}
