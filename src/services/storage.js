function storageProxy(type, fn, name, value) {
	try {
		let result = null
		switch (type) {
			case 'local':
				switch (fn) {
					case 'get':
						result = localStorage.getItem(name)
						break
					case 'set':
						result = localStorage.setItem(name, value)
						break
					case 'remove':
						result = localStorage.removeItem(name)
						break
					default:
						return
				}
				break
			case 'session':
				switch (fn) {
					case 'get':
						result = sessionStorage.getItem(name)
						break
					case 'set':
						result = sessionStorage.setItem(name, value)
						break
					case 'remove':
						result = sessionStorage.removeItem(name)
						break
					default:
						return
				}
				break
			default:
				return
		}
		return result
	} catch (e) {
		switch (e.code) {
			case 18:
				window.alert('请在设置-Safari-阻止cookie中选择"永不"或者"来自第三方和广告商"再进行登录')
				break
			case 22:
				window.alert('请先关闭无痕浏览模式再进行试玩')
				break
			default:
				return
		}
	}
}
export default {
	local: {
		get(name) {
			return storageProxy('local', 'get', name)
		},
		set(name, value) {
			storageProxy('local', 'set', name, value)
		},
		remove(name) {
			storageProxy('local', 'remove', name)
		}
	},
	session: {
		get(name) {
			return storageProxy('session', 'get', name)
		},
		set(name, value) {
			storageProxy('session', 'set', name, value)
		},
		remove(name) {
			storageProxy('session', 'remove', name)
		}
	}
}
