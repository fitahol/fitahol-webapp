import {
	fetchGeted,
	FETCH_DATA,
	modalOpen,
	directTo,
	boolToggle
} from '../actions'
import {
	toast,
	json2url
} from '../services/util'

import 'whatwg-fetch'
import 'es6-promise'

import {
	put,
	call
} from 'redux-saga/effects'
import {
	takeEvery
} from 'redux-saga'

import $storage from '../services/storage'

export const fetchData = (url, options = {}) => {
	const self = $storage.local.get('self')
	// const userId = $storage.local.get('user_id')
	const token = $storage.local.get('token')

	const hostName = location.hostname
	let domain = `http://${hostName}`
	domain = 'http://api.fitahol.com'
	if (location.hostname === '127.0.0.1' && location.port === '2211') {
		domain = 'http://0.0.0.0:9999'
	}
	if (~url.indexOf('http')) {
		domain = ''
	}

	const myHeaders = new Headers()
	const querys = {}
	if (token) {
		myHeaders.append('Authorization', `Token ${token}`)
	}
	if (self) {
		querys.self = self
	}
	// if (userId) {
	// 	querys.user_id = userId
	// }

	let defaultOptions = {}

	if (!options.method) {
		defaultOptions = {
			method: 'GET',
			headers: myHeaders,
			querys
		}
	}
	if (options.method === 'POST') {
		myHeaders.append('Content-Type', 'application/json')
		myHeaders.append('Accept', 'application/json')
		const body = JSON.stringify(options.params)
		defaultOptions = {
			method: 'POST',
			headers: myHeaders,
			body
		}
	}
	if (options.method === 'PUT') {
		myHeaders.append('Content-Type', 'application/json')
		myHeaders.append('Accept', 'application/json')
		const body = JSON.stringify(options.params)
		defaultOptions = {
			method: 'PUT',
			headers: myHeaders,
			body
		}
	}
	if (options.method === 'PATCH') {
		myHeaders.append('Content-Type', 'application/json')
		myHeaders.append('Accept', 'application/json')
		const body = JSON.stringify(options.params)
		defaultOptions = {
			method: 'PATCH',
			headers: myHeaders,
			body
		}
	}
	if (options.method === 'DELETE') {
		defaultOptions = {
			method: 'DELETE',
			headers: myHeaders
		}
	}
	// 'GET' method querys
	const fetchQeury = json2url(
			Object.assign(
				{},
				querys || {},
				options.querys || {}
			)
	)
	let paramOpe = '?'
	if (~url.indexOf('?')) {
		paramOpe = '&'
	}
	let fetchUrl = `${domain}${url}${paramOpe}${fetchQeury}`
	if ((/['&']$/).test(fetchUrl)) {
		fetchUrl = fetchUrl.slice(0, fetchUrl.length - 1)
	}
	return fetch(`${fetchUrl}`, defaultOptions)
}

export function* fetchRequest(action) {
	yield put(boolToggle('isLoading', true))
	const response = yield call(fetchData, action.url, action.options)
	const code = response.status
	let data = yield Promise.resolve(response)
		.then(queryResponse => {
			// code === 204
			if (queryResponse.statusText === 'No Content') {
				return queryResponse || {}
			}
			return queryResponse.text()
		})
	if (!data) {
		data = {}
	} else if (data[0] === '{' && data[data.length - 1] === '}'
	|| data[0] === '[' && data[data.length - 1] === ']') {
		data = JSON.parse(data)
	} else {
		data = {}
	}

	if (code >= 500) {
		yield put(modalOpen({
			content: '服务器出现故障,请耐心等待'
		}))
	} else if (code === 400) {
		yield put(modalOpen({
			content: (data && data.detail) || '请求参数错误'
		}))
	} else if (code === 401) {
		$storage.local.remove('user')
		$storage.local.remove('token')
		if (data && data.detail === 'user_inactive') {
			// 用户被禁
			yield put(directTo('/error?info=forbidden'))
		} else {
			// token失效
			yield put(directTo('/login'))
		}
	} else if (code === 403 || code === 404) {
		yield put(modalOpen({
			content: (data && data.detail)
		}))
	} else if (code === 410) {
		// avoid reset modal callback
		action.key = 'logEvent'
		yield put(modalOpen({
			content: (data && data.detail) || '您有未完成的任务',
			confirmCallback: () => {
				window.location.reload()
			}
		}))
	} else if (code === 215) {
		action.key = 'logEvent'
		yield put(modalOpen({
			content: '检测到您已经安装过该应用',
			confirm: '刷新列表',
			confirmCallback: () => {
				window.location.reload()
			} // TODO: refresh
		}))
	} else {
		if (data && data.detail) {
			data.code = code
			if (data.toast) {
				toast(data.detail)
			} else {
				if (data.code !== 200) {
					yield put(modalOpen({
						content: data.detail
					}))
				}
			}
		}
	}
	data.code = code
	yield put(fetchGeted(action.key, data, action.filter))
}

export default function* rootSaga() {
	yield* takeEvery(FETCH_DATA, fetchRequest)
}
