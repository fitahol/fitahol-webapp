import React, { PropTypes } from 'react'
import $storage from '../../../services/storage'
import { toDou } from '../../../services/util'

class HourItemEle extends React.Component {
	static propTypes = {
		hourItemTitle: PropTypes.string.isRequired,
		valChange: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		hasClickItem: PropTypes.bool.isRequired,
		hasClickItemInfo: PropTypes.object.isRequired,
		weekTitleInfo: PropTypes.array.isRequired,
		dateTitleInfo: PropTypes.array.isRequired,
		fitaholData: PropTypes.array.isRequired
	}
	constructor(props) {
		super(props)
		this.handleItemClick = this.handleItemClick.bind(this)
		this.enterLink = this.enterLink.bind(this)
		this.hasClickItemInfo = this.props.hasClickItemInfo || {
			hourItem: '',
			hourSpaceIndex: 0
		}
	}

	handleItemClick(index, hourItemTitle) {
		const weekTitleInfo = JSON.parse($storage.local.get('weekTitleInfo')) || []
		const yearInfo = weekTitleInfo[index].year
		const monthInfo = weekTitleInfo[index].month
		const dayInfo = weekTitleInfo[index].day
		$storage.local.set('year', yearInfo)
		$storage.local.set('month', monthInfo)
		$storage.local.set('day', dayInfo)
		$storage.local.set('hour', hourItemTitle)
		this.hasClickItemInfo = {
			hourItem: hourItemTitle,
			hourSpaceIndex: index
		}
		this.props.valChange(true, 'hasClickItem')
		this.props.valChange(this.hasClickItemInfo, 'hasClickItemInfo')
	}

	enterLink(linkInfo, userID, eventID, start) {
		if (linkInfo !== 'build-course') {
			$storage.local.set('courseHealthBack', '/')
		}
		if (userID && (/\d+/).test(userID)) {
			$storage.local.set('user_id', userID)
		}
		if (eventID && (/\d+/).test(eventID)) {
			$storage.local.set('event_id', eventID)
		}
		if (typeof start === 'string') {
			let result = start.replace(/\s/, 'T')
			result = new Date(result).getMinutes()
			result = toDou(result)
			$storage.local.set('minutes', result)
		}
		this.props.directTo(`/${linkInfo}`)
	}

	formatDateParse(data) {
		const result = data.toString().replace(/\s/, 'T')
		return Date.parse(result)
	}

	render() {
		const that = this
		const props = this.props
		// start "2016-10-15 20:00:00"
		const fitaholData = props.fitaholData
		const hasDataimeInfo = []
		if (fitaholData.length) {
			fitaholData.forEach((item) => {
				hasDataimeInfo.push(that.formatDateParse(item.start))
			})
		}
		// const randomNum = Math.floor(Math.random() * (4 - 1 + 1) + 1)
		const weekTitleInfoEle = (
			props.weekTitleInfo.map((item, index) => {
				const random = (index + +props.hourItemTitle) % 5
				let memberInfoShowClass = `random-info-show random-info-show${random}`
				const itemTime = `${item.year}-${item.month}-${item.day} ${props.hourItemTitle}:00:00`
				const formatItemTime = that.formatDateParse(itemTime)
				let enterItemEle
				let itemTimeIndex
				if (hasDataimeInfo.length) {
					hasDataimeInfo.forEach((childItem, childIndex) => {
						const formatPeriod = childItem - formatItemTime
						if (formatPeriod === 0) {
							itemTimeIndex = childIndex
						} else if (formatPeriod === 1800000) {
							itemTimeIndex = childIndex
							memberInfoShowClass += ' random-info-show-half'
						}
					})
				}
				if (itemTimeIndex >= 0) {
					const userInfo = fitaholData[itemTimeIndex].user
					const eventID = fitaholData[itemTimeIndex].id
					const start = fitaholData[itemTimeIndex].start
					enterItemEle = (
						<a
							className={memberInfoShowClass}
							onClick={this.enterLink.bind(this,
								`member/course/${userInfo.user_id}`,
								userInfo.user_id, eventID, start)}
						>
							<img src={userInfo.portrait} alt="" />
							<span>{userInfo.nickname.slice(0, 3)}</span>
						</a>
					)
				} else {
					enterItemEle = (
						<a onClick={this.enterLink.bind(this, 'build-course')}>+</a>
					)
				}
				return (
					<div
						className={
							props.hasClickItem &&
							props.hasClickItemInfo.hourSpaceIndex === index &&
							props.hasClickItemInfo.hourItem === props.hourItemTitle
							? 'hour-space-item hour-active-item'
							: 'hour-space-item'
						}
						key={index}
						onClick={this.handleItemClick.bind(this, index, props.hourItemTitle)}
					>
						{enterItemEle}
					</div>
				)
			})
		)
		return (
			<div className="hour-item">
				<span className="hour-item-title">{props.hourItemTitle}:00</span>
				{weekTitleInfoEle}
			</div>
		)
	}
}

export default HourItemEle
