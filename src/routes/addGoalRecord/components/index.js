import React, { PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'
import { toast } from '../../../services/util'

export default class addGoalRecordEle extends React.Component {
	static propTypes = {
		valChange: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		fetchList: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		fitGoalInfo: PropTypes.object.isRequired,
		addResultInfo: PropTypes.object.isRequired,
		upDateStatus: PropTypes.bool.isRequired,
		adGoalTime: PropTypes.string.isRequired,
		params: PropTypes.object
	}

	static defaultPropTypes = {
		addResultInfo: {}
	}

	constructor(props) {
		super(props)
		this.confirmGoal = this.confirmGoal.bind(this)
		this.formatTime = this.formatTime.bind(this)
		this.handleChangeTime = this.handleChangeTime.bind(this)
		this.goalID = +$storage.local.get('goalID') || 0
	}

	componentWillMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
		this.props.valChange(false, 'upDateStatus')
	}

	componentDidMount() {
		const that = this
		const props = this.props
		function changeUpDate() {
			props.valChange(true, 'upDateStatus')
		}
		function fitGoalInfoFilter(fitGoalInfo) {
			if (fitGoalInfo.name) {
				setTimeout(changeUpDate, 50)
			}
			that.refs.name_ref.value = fitGoalInfo.name || ''
			that.refs.measure_ref.value = fitGoalInfo.measure || ''
			return fitGoalInfo
		}
		if (this.goalID) {
			props.fetchList(
				`/fitness/fit_goal/${this.goalID}/`,
				undefined,
				'fitGoalInfo',
				fitGoalInfoFilter
			)
		}
	}

	formatTime(timeData) {
		const timeDataValue = this.refs[timeData].value
		const timeDataInfo = timeDataValue.split('-')
		const year = timeDataInfo[0]
		const month = timeDataInfo[1]
		const day = timeDataInfo[2]
		this.props.valChange(`${year}年${month}月${day}日`, 'adGoalTime')
	}

	handleChangeTime() {
		this.formatTime('cdate_ref')
	}

	confirmGoal() {
		const props = this.props
		const cdate = this.refs.cdate_ref.value
		const current = this.refs.current_ref.value
		if (!current) {
			toast('请输入记录数值')
			return
		} else if (!cdate) {
			toast('请输入添加记录日期')
			return
		}
		function addResultInfoFilter(addResultInfo) {
			setTimeout(() => {
				props.directTo(`/member/health/${props.params.userID}`)
			}, 50)
			return addResultInfo
		}

		const queryData = {
			method: 'POST',
			params: {
				user: props.params.userID,
				fit_goal: this.goalID,
				current,
				cdate
			},
			querys: {
				time: Date.now()
			}
		}
		this.props.fetchList(
			'/fitness/goal_record/',
			queryData,
			'addResultInfo',
			addResultInfoFilter
		)
	}

	render() {
		// const fitgoal = this.props.fitGoalInfo.fit_goal || {}
		const props = this.props
		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''

		return (
			<div className="container add-course-wrap">
				<div className="add-course-main">
					<div className="add-course-item add-course-time">
						<span>目标名称</span>
						<input
							type="text" name="name" placeholder="输入目标名称"
							ref="name_ref"
							disabled
							className="add-course-info add-course-time"
							required
						/>
					</div>
					<div className="add-course-item add-course-time">
						<span>目标单位</span>
						<input
							type="text" placeholder="输入单位，如KG"
							ref="measure_ref" name="measure"
							disabled
							className="add-course-info add-course-time"
							required
						/>
					</div>
					<div className="add-course-item add-course-time">
						<span>记录数值</span>
						<input
							type="number" placeholder="输入数据值"
							ref="current_ref" name="current"
							className="add-course-info add-course-time"
							required
						/>
					</div>
					<div className="add-course-item record-cdate">
						<span>记录日期</span>
						<p>{props.adGoalTime}</p>
						<input
							type="date" placeholder="输入日期"
							ref="cdate_ref" name="cdate"
							className="add-course-info add-course-time"
							onChange={this.handleChangeTime}
							required
						/>
					</div>
				</div>
				<div className="add-confirm" onClick={this.confirmGoal}>确认</div>
				{popupEle}
			</div>
		)
	}
}
