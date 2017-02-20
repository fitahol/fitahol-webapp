import React, { PropTypes } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import { header, rootPath } from '../../routes/config'
import { urlPathParse } from '../../services/util'
import $storage from '../../services/storage'
// const hostName = location.hostname
// let domain = `http://${hostName}`
// if (location.hostname === '91atm.local.com') {
// 	domain = 'http://91atm.aa123bb.com'
// }

// function pageLog(path, user) {
// 	let userParam
// 	if (user) {
// 		userParam = `&user=${user}`
// 	}
// 	fetch(`${domain}/firmware/web/visit/?page=${path}${userParam}`)
// }

function fontResize() {
	const width = document.body.offsetWidth
	const fontSize = width / 320 * 12
	document.querySelector('html').style.fontSize = `${fontSize}px`
	return fontSize
}

fontResize()

const screenHeight = Math.max(document.documentElement.clientHeight || window.innerHeight)

// function setScreenHeight(pathArr) {
// 	if (~pathArr.indexOf(location.pathname)) {
// 		document.querySelector('.container').style.minHeight =
// 		`${screenHeight}px`
// 	}
// }

class CoreLayout extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.unreadNum = +$storage.local.get('unread_num') || 0
	// }
	componentDidMount() {
		document.querySelector('.container').style.minHeight =
		`${screenHeight - fontResize() * 3.33 - 56}px`
	}

	componentDidUpdate() {
		const pathname = urlPathParse(location.pathname)
		console.log(pathname)
		const bodyStyle = document.body.style
		if (~[
			'member',
			'build-course',
			'course-charts',
			'account',
			'message',
			'coach-list'
		].indexOf(pathname)) {
			bodyStyle.backgroundColor = '#edf0f5'
		} else {
			bodyStyle.backgroundColor = '#fff'
		}
	}

	render() {
		const unreadCount = +$storage.local.get('unread_count') || 0
		let pathName = this.props.location.pathname.replace(rootPath, '')
		const uType = +$storage.local.get('uType')
		if (pathName[0] === '/') {
			pathName = urlPathParse(pathName)
		}
		let headerEle
		let footerEle
		let headerMessage = header[pathName]
		let tabNum
		if (uType === 1) {
			tabNum = ['fitahol', 'member', 'account'].indexOf(pathName)
		} else {
			tabNum = ['member-health', 'course-record', 'account'].indexOf(pathName)
		}

		if (~tabNum) {
			headerMessage.back = null
			footerEle = <Footer tabNum={tabNum} unreadCount={unreadCount} />
		}

		if (pathName === 'member-course') {
			const monthInfo = $storage.local.get('month') || ''
			const dayInfo = $storage.local.get('day') || ''
			const hourInfo = $storage.local.get('hour') || ''
			const minutesInfo = $storage.local.get('minutes') || '00'
			if (monthInfo) {
				headerMessage.title = `${monthInfo}月${dayInfo}日${hourInfo}:${minutesInfo}健身课`
			}
		}

		if (headerMessage && headerMessage.title) {
			if (!uType && pathName === 'add-member') {
				headerMessage.title = '添加教练'
			}
			headerEle = <Header headerMessage={headerMessage} />
			headerMessage.goBack = this.context.router.goBack
		}
		return (
			<div id="root-wrap">
				{headerEle}
				{this.props.children}
				{footerEle}
			</div>
		)
	}
}

CoreLayout.propTypes = {
	children: PropTypes.element.isRequired,
	location: PropTypes.object.isRequired
}

CoreLayout.contextTypes = {
	router: PropTypes.object.isRequired
}

export default CoreLayout
