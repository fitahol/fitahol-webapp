import { injectReducer } from '../../reducers'

import buildCourse from './containers/buildCourseContainer'
import reducer from './modules/buildCourse'
import './buildCourse.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'buildCourse', reducer })
	cb(null, buildCourse)
}
