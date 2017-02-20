const userAgent = navigator.userAgent.toLowerCase()
export default {
	isAndroid: /Android/i.test(userAgent),
	isIOS: /iphone|ipad|ipod/i.test(userAgent),
	isAfterIOS8: /iphone|ipad|ipod/i.test(userAgent)
		&& userAgent.split('like')[0].split('os')[1].replace(/\s+/g, '').split('_')[0] - 0 > 8,
	isWeixin: /micromessenger/i.test(userAgent),
	isWeibo: /weibo/i.test(userAgent),
	isBeforeIOS7: /iphone|ipad|ipod/i.test(userAgent)
		&& userAgent.split('like')[0].split('os')[1].replace(/\s+/g, '').split('_')[0] - 0 < 7
}
