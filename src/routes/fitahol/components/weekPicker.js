import React, { PropTypes } from 'react'
import ReactSwipe from 'react-swipe'
import $storage from '../../../services/storage'
import moment from 'moment'
import HourEle from './hourPicker'
import { AddIcon } from '../../../public/materialUi'

class WeekClendar extends React.Component {
	static propTypes = {
		valChange: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		fetchList: PropTypes.func.isRequired,
		modalOpen: PropTypes.func.isRequired,
		currentDateInfo: PropTypes.string.isRequired,
		weekTitleInfo: PropTypes.array.isRequired,
		dateTitleInfo: PropTypes.array.isRequired,
		actualWeekMoment: PropTypes.object.isRequired,
		hasClickItem: PropTypes.bool.isRequired,
		hasClickItemInfo: PropTypes.object.isRequired,
		swipeIndex: PropTypes.number.isRequired,
		fitaholData: PropTypes.array.isRequired
	}
	static defaultPropTypes = {
		weekTitleInfo: [],
		dateTitleInfo: [],
		actualWeekMoment: moment(),
		fitaholData: []
	}

	constructor(props) {
		super(props)
		this.actuaWeek = moment()
		this.scheduleArray = []
		this.getDateInfo = this.getDateInfo.bind(this)
		this.fillTheDates = this.fillTheDates.bind(this)
		this.schedulePrev = this.schedulePrev.bind(this)
		this.scheduleNext = this.scheduleNext.bind(this)
		this.swipeDirectionjudg = this.swipeDirectionjudg.bind(this)
		this.weekTitleInfo = this.props.weekTitleInfo || []
		this.dateTitleInfo = this.props.dateTitleInfo || []
		this.chineseWeekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
		this.EnglishWeekArr = ['MON', 'THU', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
		const week = +this.actuaWeek.format('d')
		this.nowInfo = `${this.actuaWeek.format('YYYY[年]MM[月]DD[日]')}${this.chineseWeekArr[week - 1]}`

		this.swipeOptions = {
			speed: 50,
			continuous: true,
			startSlide: 1,
			callback: (index) => {
				this.swipeDirectionjudg(index)
			}
		}
		this.enterAddEvent = this.enterAddEvent.bind(this)
		this.resetClickItemInfo = this.resetClickItemInfo.bind(this)
	}

	componentDidMount() {
		this.resetDate()
		this.getCalendar()
		this.fillTheDates(this.actuaWeek)
		// this.getDateInfo()
		const width = document.body.offsetWidth
		const fontSize = width / 320 * 12
		window.scrollTo(0, fontSize * 32)
		// window.scrollY()
	}

	getDateInfo(startTime, endTime) {
		function filter(fitaholData) {
			return fitaholData
		}
		this.props.fetchList(
			'/schedule/event/',
			{
				querys: {
					// user_id: $storage.local.get('user_id'),
					interval: 'date_range',
					begin: startTime,
					end: endTime,
					time: Date.now()
				}
			},
			'fitaholData',
			filter
		)
	}

	getDays(year, month, day) {
		let days = 0
		for (let i = 0; i < month; i++) {
			switch (i) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12: {
					days += 31
					break
				}
				case 4:
				case 6:
				case 9:
				case 11: {
					days += 30
					break
				}
				case 2: {
					if (this.isLeapYear(year)) {
						days += 29
					} else {
						days += 28
					}
					break
				}
				default:
					days += 0
			}
		}
		days += day
	}

	getCalendar() {
		const date = new Date()
		this.getDays(date.getFullYear(), date.getMonth() + 1, date.getDate())
	}

	resetDate() {
		const nowYear = this.actuaWeek.format('YYYY')
		const nowMonth = this.actuaWeek.format('MM')
		const nowDate = this.actuaWeek.format('DD')
		const localYear = $storage.local.get('year')
		const localMonth = $storage.local.get('month')
		const localDay = $storage.local.get('day')
		if (!(localYear && localMonth && localDay)) {
			$storage.local.set('year', nowYear)
			$storage.local.set('month', nowMonth)
			$storage.local.set('day', nowDate)
		}
	}

	resetClickItemInfo() {
		const hasClickItemInfo = {
			hourItem: '',
			hourSpaceIndex: 0
		}
		this.props.valChange(hasClickItemInfo, 'hasClickItemInfo')
	}

	fillTheDates(mondayDate) {
		const tmpdate = moment(mondayDate)
		const props = this.props
		const yearInfo = mondayDate.format('YYYY')
		const monthInfo = mondayDate.format('MM')
		const dayInfo = mondayDate.format('DD')
		const currentDateInfo = `${yearInfo}年${monthInfo}月${dayInfo}日`
		props.valChange(currentDateInfo, 'currentDateInfo')
		// $storage.local.set('yearMonth', currentDateInfo)

		let weekItems = this.refs.week.children
		weekItems = [...weekItems]
		this.weekTitleInfo = []
		this.dateTitleInfo = []
		weekItems.forEach((item, index) => {
			const dzien = tmpdate.day(index + 1)
			this.weekTitleInfo.push({
				year: dzien.format('YYYY'),
				month: dzien.format('MM'),
				day: dzien.format('DD')
			})
			this.dateTitleInfo.push(`${dzien.format('YYYY[年]MM[月]DD')}日${this.chineseWeekArr[index]}`)
		})
		props.valChange(this.weekTitleInfo, 'weekTitleInfo')
		props.valChange(this.dateTitleInfo, 'dateTitleInfo')
		$storage.local.set('weekTitleInfo', JSON.stringify(this.weekTitleInfo))
		const startTime = this.weekTitleInfo[0]
		const endTime = this.weekTitleInfo[6]
		this.getDateInfo(
			`${startTime.year}-${startTime.month}-${startTime.day}`,
			`${endTime.year}-${endTime.month}-${endTime.day}`
		)
	}

	scheduleNext() {
		this.resetClickItemInfo()
		const props = this.props
		setTimeout(() => {
			let actualWeek = props.actualWeekMoment
			actualWeek = actualWeek.add(7, 'days')
			props.valChange(actualWeek, 'actualWeekMoment')
			this.fillTheDates(actualWeek)
		}, 5)
	}

	schedulePrev() {
		this.resetClickItemInfo()
		const props = this.props
		setTimeout(() => {
			let actualWeek = props.actualWeekMoment
			actualWeek = actualWeek.subtract(7, 'days')
			props.valChange(actualWeek, 'actualWeekMoment')
			setTimeout(() => {
				this.fillTheDates(actualWeek)
			}, 5)
		}, 5)
	}

	isLeapYear(year) {
		return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
	}

	swipeDirectionjudg(index) {
		const prevIndex = this.props.swipeIndex
		if (prevIndex + 1 === index || (prevIndex === 2 && index === 0)) {
			this.scheduleNext()
		} else {
			this.schedulePrev()
		}
		this.props.valChange(index, 'swipeIndex')
	}

	enterAddEvent() {
		this.props.directTo('/build-course')
	}

	render() {
		// const that = this
		const props = this.props
		const fitaholTitleEle = (
			<div className="fitahol-title">
				<AddIcon onTouchTap={this.enterAddEvent} />
			</div>
		)

		const weekTitleEle = (
			<ul ref="week" className="week">
				{
					this.EnglishWeekArr.map((item, index) => {
						let nowClassStr
						if (props.dateTitleInfo[index] === this.nowInfo) {
							nowClassStr = 'now-date'
						}
						const weekTitleInfoItem = props.weekTitleInfo[index] || {}
						return (
							<li key={index} className={nowClassStr}>
								<h5>{item}</h5>
								<p>
									{weekTitleInfoItem.day}
								</p>
							</li>
						)
					})
				}
			</ul>
		)

		let fitaholTtileFixEle = (
			<div className="fitahol-week-list fitahol-fix">
				{weekTitleEle}
			</div>
		)
		const fitaholeCourseEle = (
			<div className="fitahol-course">
				<HourEle
					weekTitleInfo={props.weekTitleInfo}
					dateTitleInfo={props.dateTitleInfo}
					hasClickItem={props.hasClickItem}
					hasClickItemInfo={props.hasClickItemInfo}
					valChange={props.valChange}
					directTo={props.directTo}
					fitaholData={props.fitaholData}
				/>
			</div>
		)


		const fitaholShowDate = {}
		if (props.weekTitleInfo.length) {
			fitaholShowDate.year = props.weekTitleInfo[5].year
			fitaholShowDate.month = props.weekTitleInfo[5].month
		}

		return (
			<div>
				{fitaholTitleEle}
				<div className="fitahol-title-month">{fitaholShowDate.year}年{fitaholShowDate.month}月</div>
				<ReactSwipe
					ref="courseSwipe"
					className="week-clendar-swipe"
					swipeOptions={this.swipeOptions}
				>
					{fitaholeCourseEle}
					{fitaholeCourseEle}
					{fitaholeCourseEle}
				</ReactSwipe>
				{fitaholTtileFixEle}
			</div>
		)
	}
}

export default WeekClendar
