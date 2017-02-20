import { injectReducer } from '../../reducers'

import courseCharts from './containers/courseChartsContainer'
import reducer from './modules/courseCharts'
import './courseCharts.scss'

export default (store, cb) => {
	injectReducer(store, { key: 'courseCharts', reducer })
	cb(null, courseCharts)
}

