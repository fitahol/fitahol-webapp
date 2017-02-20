export const BOOL_TOGGLE = 'BOOL_TOGGLE'
export const FETCH_GETED = 'FETCH_GETED'
export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_ERROR = 'FETCH_ERROR'
export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'
export const DIRECT_TO = 'DIRECT_TO'
export const VAL_CHANGE = 'VAL_CHANGE'
export const GET_UNREAD = 'GET_UNREAD'
import { rootPath } from '../routes/config'
import $storage from '../services/storage'

export const PUSH = 'PUSH'

import { push } from 'react-router-redux'

export function directTo(url) {
	if (url[0] !== '/') {
		url = `/${url}`
	}
	return push(`${rootPath}${url}`)
}

/**
 * request
 * url
 * key where to put the state
 */
export function fetchList(url, options, key, filter) {
	return {
		type: FETCH_DATA,
		options,
		url,
		key,
		filter
	}
}

export function fetchGeted(key, list, filter = (data) => data) {
	return {
		type: FETCH_GETED,
		data: list,
		key,
		filter
	}
}

export function fetchError(status) {
	return {
		type: FETCH_ERROR,
		status
	}
}

export function boolToggle(key, val) {
	return {
		type: BOOL_TOGGLE,
		key,
		val
	}
}

export function modalOpen(payload) {
	return {
		type: MODAL_OPEN,
		payload
	}
}

export function modalClose(payload) {
	return {
		type: MODAL_CLOSE,
		payload
	}
}

export function valChange(val, key) {
	return {
		type: VAL_CHANGE,
		val,
		key
	}
}

export function getUnread(val) {
	return {
		type: GET_UNREAD,
		val: val || $storage.local.get('unread_num') || 0
	}
}
