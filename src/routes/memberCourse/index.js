
import { injectReducer } from '../../reducers'

import course from './containers/courseContainer'
import reducer from './modules/course'
import './memberCourse.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'course', reducer })
	cb(null, course)
}
