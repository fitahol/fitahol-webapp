// import error from './error'

// import { toast } from '../services/util'
import { rootPath } from './config'

import coreLayout from '../layouts/CoreLayout'

function loadRoute(cb, store) {
	return (module) => module.default(cb, store)
}

function errorLoading(err) {
	// toast('当前页面加载失败, 请刷新重试')
	console.error('Dynamic page loading failed', err)
}

export const createRoutes = (store) => ({
	path: `${rootPath}/`,
	indexRoute: {
		getComponent(nextState, cb) {
			System.import('./fitahol').then(loadRoute(store, cb)).catch(errorLoading)
		}
	},
	component: coreLayout,
	childRoutes: [
		{
			path: `${rootPath}/login`,
			getComponent(nextState, cb) {
				System.import('./login').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/register`,
			getComponent(nextState, cb) {
				System.import('./register').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/iforget`,
			getComponent(nextState, cb) {
				System.import('./iforget').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/reset-phone`,
			getComponent(nextState, cb) {
				System.import('./resetPhone').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/account`,
			getComponent(nextState, cb) {
				System.import('./account').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/member`,
			getComponent(nextState, cb) {
				System.import('./member').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/message`,
			getComponent(nextState, cb) {
				System.import('./message').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/message/:messageID`,
			getComponent(nextState, cb) {
				System.import('./messageDetail').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/member/health/:userID`,
			getComponent(nextState, cb) {
				System.import('./memberHealth').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/member/course/:userID`,
			getComponent(nextState, cb) {
				System.import('./memberCourse').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/course/charts`,
			getComponent(nextState, cb) {
				System.import('./courseCharts').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/build-course`,
			getComponent(nextState, cb) {
				System.import('./buildCourse').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/add-action`,
			getComponent(nextState, cb) {
				System.import('./addAction').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/add-member`,
			getComponent(nextState, cb) {
				System.import('./addMember').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/add-course`,
			getComponent(nextState, cb) {
				System.import('./addCourse').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/course-record`,
			getComponent(nextState, cb) {
				System.import('./courseRecord').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/add-fitgoal/:userID`,
			getComponent(nextState, cb) {
				System.import('./addFitGoal').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/add-goal-record/:userID`,
			getComponent(nextState, cb) {
				System.import('./addGoalRecord').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/personal-center`,
			getComponent(nextState, cb) {
				System.import('./personalCenter').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/health-record`,
			getComponent(nextState, cb) {
				System.import('./healthRecord').then(loadRoute(store, cb)).catch(errorLoading)
			}
		},
		{
			path: `${rootPath}/coach-list`,
			getComponent(nextState, cb) {
				System.import('./coachList').then(loadRoute(store, cb)).catch(errorLoading)
			}
		}
		// error(store)
	]
})

export default createRoutes
