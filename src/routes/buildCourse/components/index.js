import React, { Component, PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'
import { toast, toDou } from '../../../services/util'
import BuildSelectEle from '../../../components/selectModel'
import { SelectField, MenuItem } from '../../../public/materialUi'


class BuildCourseEle extends Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		repeatCourseType: PropTypes.number.isRequired,
		courseType: PropTypes.number.isRequired,
		startTime: PropTypes.string.isRequired,
		endTime: PropTypes.string.isRequired,
		endRepeatTime: PropTypes.string,
		repeatTimes: PropTypes.number.isRequired,
		ruleInfo: PropTypes.array.isRequired,
		queryID: PropTypes.string.isRequired,
		chooseWeekIndex: PropTypes.array.isRequired,
		selectData: PropTypes.array.isRequired
	}

	static defaultProps = {
		endRepeatTime: ''
	}
	constructor(props) {
		super(props)
		this.handleChangeStartTime = this.handleChangeStartTime.bind(this)
		this.handleChangeEndTime = this.handleChangeEndTime.bind(this)
		this.handleChangeRepeatTime = this.handleChangeRepeatTime.bind(this)
		this.handleChangeRepeatType = this.handleChangeRepeatType.bind(this)
		this.handleChangeType = this.handleChangeType.bind(this)
		this.buildConfirm = this.buildConfirm.bind(this)
		this.chooseWeekRepeat = this.chooseWeekRepeat.bind(this)
		this.userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
		this.selfID = $storage.local.get('self') || ''
		this.chooseWeekInfo = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
		this.enWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
	}

	componentWillMount() {
		const props = this.props
		if (this.props.modalState) {
			this.props.modalClose()
		}

		const startTime = new Date()
		const year = $storage.local.get('year') || startTime.getFullYear()
		const month = $storage.local.get('month') || startTime.getMonth() + 1
		const day = $storage.local.get('day') || startTime.getDate()
		const hour = $storage.local.get('hour') || startTime.getHours()
		const ymdInfo = `${year}年${month}月${day}日`
		props.valChange(`${ymdInfo} ${hour}:00`, 'startTime')
		props.valChange(`${ymdInfo} ${toDou(+hour + 1)}:00`, 'endTime')
		// props.valChange(`${year}年${month}月${toDou(+day + 1)}日 ${+hour + 1}:00`, 'endRepeatTime')
	}

	componentDidMount() {
		document.body.style.backgroundColor = '#edf0f5'
		// rule repeat
		this.props.fetchList(
			`/schedule/rule/?user_id=${this.userID}`,
			undefined,
			'ruleInfo'
		)
	}

	formatTime(timeData) {
		const timeDataValue = this.refs[timeData].value
		const timeDataInfo = timeDataValue.split('-')
		const year = timeDataInfo[0]
		const month = timeDataInfo[1]
		const afterT = timeDataInfo[2].split('T')
		const day = afterT[0]
		const hms = afterT[1].slice(0, 5)
		this.props.valChange(`${year}年${month}月${day}日 ${hms}`, timeData)
	}

	handleChangeStartTime() {
		this.formatTime('startTime')
	}
	handleChangeEndTime() {
		this.formatTime('endTime')
	}
	handleChangeRepeatTime() {
		this.formatTime('endRepeatTime')
	}
	handleChangeRepeatType(event, index, value) {
		this.props.valChange(value, 'repeatCourseType')
	}

	handleChangeType(event, index, value) {
		this.props.valChange(value, 'courseType')
	}
	buildConfirm() {
		const that = this
		const props = this.props
		const startTime = props.startTime
		const endTime = props.endTime
		const endRepeatTime = props.endRepeatTime || ''
		function formatPostDate(info) {
			let result = info.replace(/年|月/g, '-')
			result = result.replace(/日/g, '')
			return result
		}
		function formatPostDateT(info) {
			let Tresult = formatPostDate(info)
			Tresult = Tresult.replace(/\s/, 'T')
			return Tresult
		}
		if (!props.queryID) {
			toast('请选择学员')
			return
		} else if (+Date.parse(formatPostDateT(startTime)) >= +Date.parse(formatPostDateT(endTime)) - 3600) {
			toast('请选择合适的课程时长')
			return
		} else if (!~[0, 30].indexOf(new Date(formatPostDateT(startTime)).getMinutes())) {
			toast('课程开始时间请重新选择半点或整点')
			return
		} else if (!~[0, 30].indexOf(new Date(formatPostDateT(endTime)).getMinutes())) {
			toast('课程结束时间请重新选择半点或整点')
			return
		}
		const repeatTimes = this.refs.repeatTimesRef && this.refs.repeatTimesRef.value || 0
		const startTimeInfo = `${formatPostDate(startTime)}:00`
		const endTimeInfo = `${formatPostDate(endTime)}:00`
		const descriptionInfo = that.refs.description.value || ''
		const endRecurringPeriod = formatPostDate(endRepeatTime)
		if (props.repeatCourseType && !endRecurringPeriod && !repeatTimes) {
			toast('请选择重复日期或者重复次数')
			return
		}
		let customInfo = ''
		if (props.chooseWeekIndex.length) {
			props.chooseWeekIndex.forEach((item) => {
				customInfo += `,${that.enWeek[item]}`
			})
		}
		function filter(data) {
			console.log(data)
			// setTimeout(() => {
			// 	props.directTo('/')
			// }, 10)
		}
		props.fetchList(
			'/schedule/event/',
			{
				method: 'POST',
				params: {
					user_id: props.queryID,
					rule_id: props.repeatCourseType || 0,
					coach: that.selfID,
					start: startTimeInfo,
					end: endTimeInfo,
					times: repeatTimes,
					description: descriptionInfo,
					color_event: '#000000',
					end_recurring_period: endRecurringPeriod,
					custom: customInfo
				}
			},
			undefined,
			filter
		)
	}
	chooseWeekRepeat(index) {
		let chooseResult = this.props.chooseWeekIndex
		if (!~chooseResult.indexOf(index)) {
			chooseResult = chooseResult.concat([index])
		} else {
			chooseResult = chooseResult.filter(function(item) {
				return item !== index
			})
		}
		this.props.valChange(chooseResult, 'chooseWeekIndex')
	}

	render() {
		const props = this.props
		const chooseWeekIndex = props.chooseWeekIndex
		const buildCourseStartEle = (
			<div className="build-course-item build-course-start">
				<span>开始</span>
				<div className="build-course-date">
					<p className="build-course-dateinfo">{props.startTime}</p>
					<input
						type="datetime-local"
						className="date-time"
						ref="startTime"
						onChange={this.handleChangeStartTime}
					/>
				</div>
			</div>
		)
		const buildCourseEndEle = (
			<div className="build-course-item build-course-end">
				<span>结束</span>
				<div className="build-course-date">
					<p className="build-course-dateinfo">{props.endTime}</p>
					<input
						type="datetime-local"
						className="date-time"
						ref="endTime"
						onChange={this.handleChangeEndTime}
					/>
				</div>
			</div>
		)
		const buildCourseRepeatTypeEle = (
			<div className="build-course-item build-course-type">
				<span>重复</span>
				<div className="build-course-date">
					<SelectField
						value={props.repeatCourseType}
						onChange={this.handleChangeRepeatType}
						className="select-type-wrap"
					>
						<MenuItem value={0}	primaryText="一次" />
					{
						props.ruleInfo.map((item, index) => (
							<MenuItem
								key={index}
								value={index + 1}
								primaryText={item.name}
							/>
						))
					}
					</SelectField>
				</div>
			</div>
		)

		let chooseWeekEle
		if (props.repeatCourseType === 5) {
			chooseWeekEle = (
				<ul className="build-course-item choose-repeat-week">
				{
					this.chooseWeekInfo.map((item, index) => {
						let itemClass
						if (!~chooseWeekIndex.indexOf(index)) {
							itemClass = 'repeat-week-item'
						} else {
							itemClass = 'repeat-week-item repeat-week-item-active'
						}
						return (
							<li
								className={itemClass}
								key={index}
								onClick={this.chooseWeekRepeat.bind(this, index)}
							>
								<p>{item}</p>
							</li>
						)
					})
				}
				</ul>
			)
		}

		const buildCourseTypeEle = (
			<div className="build-course-item build-course-type">
				<span>类型</span>
				<div className="build-course-date">
					<SelectField
						value={props.courseType}
						onChange={this.handleChangeType}
						className="select-type-wrap"
					>
						<MenuItem value={1} primaryText="私教课" />
						<MenuItem value={2} primaryText="练习课" />
					</SelectField>
				</div>
			</div>
		)

		let endRepeatEle
		if (props.repeatCourseType) {
			endRepeatEle = (
				<div className="build-course-item">
					<span>结束重复时间</span>
					<div className="build-course-date">
						<p className="build-course-dateinfo">{props.endRepeatTime}</p>
						<input
							type="datetime-local"
							className="date-time"
							ref="endRepeatTime"
							onChange={this.handleChangeRepeatTime}
						/>
					</div>
				</div>
			)
		}

		let repeatTimeEle
		if (props.repeatCourseType) {
			repeatTimeEle = (
				<div className="build-course-item">
					<span>重复次数</span>
					<div className="build-course-date">
						<input
							type="number"
							placeholder="0"
							className="repeat-time-input"
							ref="repeatTimesRef"
						/>次
					</div>
				</div>
			)
		}

		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''

		return (
			<div className="container build-course-wrap">
				<BuildSelectEle
					queryID={props.queryID}
					valChange={props.valChange}
					modalOpen={props.modalOpen}
					directTo={props.directTo}
					fetchList={props.fetchList}
					selectData={props.selectData}
				/>
				<div className="build-course-main">
					{buildCourseStartEle}
					{buildCourseEndEle}
					{buildCourseRepeatTypeEle}
					{chooseWeekEle}
					{endRepeatEle}
					{repeatTimeEle}
					{buildCourseTypeEle}
				</div>
				<div className="remark-wrap">
					<textarea className="remark-info" ref="description"></textarea>
				</div>
				<div className="build-confrim" onClick={this.buildConfirm}>确认</div>
				{popupEle}
			</div>
		)
	}
}

export default BuildCourseEle
