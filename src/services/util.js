export function urlParamsFormat(params) {
	const result = {}
	params.split('&').forEach(item => {
		const tmp = item.split('=')
		const key = tmp[0]
		const value = tmp[1]
		result[key] = value
	})
	return result
}

export	function hasKey(params, key) {
	const keyItems = urlParamsFormat(params)
	return Object.keys(keyItems).some((item) => (item === key))
}

export function json2url(json) {
	const arr = []
	for (const i of Object.keys(json)) {
		arr.push(`${i}=${json[i]}`)
	}
	return arr.join('&')
}

export function trimKeyParams(params, key) {
	const keyItems = urlParamsFormat(params)
	if (hasKey(params, key)) {
		delete keyItems[key]
	}
	return json2url(keyItems)
}

export function toast(message) {
	const toastItem = document.querySelector('.toast')
	if (toastItem) {
		toastItem.innerText = message
		return
	}
	const divEle = document.createElement('div')
	divEle.className = 'toast'
	divEle.innerHTML = `<span>${message}</span>`
	document.body.appendChild(divEle)

	function addClass() {
		divEle.className = 'toast toast-hide'
	}

	function removeEle() {
		divEle.parentNode.removeChild(divEle)
	}
	setTimeout(addClass, 700)
	setTimeout(removeEle, 1400)
}

export function debounce(func, wait, immediate) {
	let timeout
	let args
	let context
	let timestamp
	let result

	const later = () => {
		const last = new Date().getTime() - timestamp

		if (last < wait && last >= 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return (...arg) => {
		context = this
		timestamp = new Date().getTime()
		const callNow = immediate && !timeout
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, arg)
			context = arg = null
		}

		return result
	}
}

export function toDou(item) {
	return item < 10 ? `0${item}` : `${item}`
}

export function operateTimeFormat(time) {
	const date = time.split(' ')[0].split('-')
	return `${date[0]}年${date[1]}月${date[2]}日`
}

export function logEvent(vm, e) {
	// 点击记录
	function setLog() {
		if (vm.props && vm.props.fetchList) {
			vm.props.fetchList(`/firmware/client/log/?event=${e}`, undefined, 'logEvent')
		}
	}
	// other action
	setTimeout(setLog, 10)
}

export function sortJsonArr(sortBy, list) {
	return list.sort((a, b) => (b[sortBy] - a[sortBy]))
		// 降序，若需要升序则互换两者位置
}

	// 版本区分
export function versionCompare(v1, v2, options) {
	const lexicographical = options && options.lexicographical
	const zeroExtend = options && options.zeroExtend
	let v1parts = v1 && v1.split('.') || []
	let v2parts = v2.split('.')

	function isValidPart(x) {
		return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x)
	}

	if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
		return NaN
	}

	if (zeroExtend) {
		while (v1parts.length < v2parts.length) v1parts.push('0')
		while (v2parts.length < v1parts.length) v2parts.push('0')
	}

	if (!lexicographical) {
		v1parts = v1parts.map(Number)
		v2parts = v2parts.map(Number)
	}

	for (let i = 0; i < v1parts.length; ++i) {
		if (v2parts.length === i) {
			return 1
		}

		if (v1parts[i] === v2parts[i]) {
			continue
		} else if (v1parts[i] > v2parts[i]) {
			return 1
		} else {
			return -1
		}
	}

	if (v1parts.length !== v2parts.length) {
		return -1
	}
	return 0
}

export function hasStorage(key) {
	let val = localStorage.getItem(key)
	if (!val || val === 'undefined' || val === 'null') {
		val = false
	}
	return val
}

export function isNumber(n) {
	return !isNaN(parseInt(n, 10)) && isFinite(n)
}

export function blurryTrim(key) {
	const params = urlParamsFormat(location.search.substr(1)) || {}
	const startGes = params[key] ? params[key].match(/\D+/g) : ''
	let startIndex
	let trimValue
	if (startGes) {
		startIndex = params[key].indexOf(startGes[0])
		trimValue = params[key].substr(0, startIndex)
	} else {
		trimValue = params[key]
	}
	return trimValue
}
export function isEmptyObject(obj) {
	for (let key in obj) {
		return false
	}
	return true
}

export function urlPathParse(pathName) {
	const pathParams = pathName.slice(1).split('/')
	const secondPath = pathParams.slice(1)[0]
	let mixPathName
	if (pathParams.length >= 2 && isNumber(secondPath)) {
		mixPathName = pathParams.slice(0, 1).join('-') || 'fitahol'
	} else {
		mixPathName = pathParams.slice(0, 2).join('-') || 'fitahol'
	}
	return mixPathName
}
