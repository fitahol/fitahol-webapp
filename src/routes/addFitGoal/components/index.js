import React, { PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'

export default class addFitGoalEle extends React.Component {
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
		params: PropTypes.object
	}

	static defaultPropTypes = {
		addResultInfo: {}
	}

	constructor(props) {
		super(props)
		this.confirmGoal = this.confirmGoal.bind(this)
		this.deleteGoal = this.deleteGoal.bind(this)
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
			that.refs.goal_ref.value = fitGoalInfo.goal || ''
			that.refs.desc_ref.value = fitGoalInfo.desc || ''
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

	confirmGoal() {
		const props = this.props
		const name = this.refs.name_ref.value
		const goal = this.refs.goal_ref.value
		const desc = this.refs.desc_ref.value
		const measure = this.refs.measure_ref.value
		let methoadInfo = 'POST'
		let APIURL = '/fitness/fit_goal/'
		if (props.upDateStatus) {
			methoadInfo = 'PUT'
			APIURL = `/fitness/fit_goal/${this.goalID}/`
		}

		function addResultInfoFilter(addResultInfo) {
			setTimeout(() => {
				props.directTo(`/member/health/${props.params.userID}`)
			}, 50)
			return addResultInfo
		}

		const queryData = {
			method: methoadInfo,
			params: {
				user_id: props.params.userID,
				name,
				goal,
				desc,
				measure
			},
			querys: {
				time: Date.now()
			}
		}
		this.props.fetchList(
			APIURL,
			queryData,
			'addResultInfo',
			addResultInfoFilter
		)
	}

	deleteGoal() {
		const props = this.props
		const name = this.refs.name_ref.value
		const goal = this.refs.goal_ref.value
		const desc = this.refs.desc_ref.value
		const measure = this.refs.measure_ref.value

		function addResultInfoFilter(addResultInfo) {
			setTimeout(() => {
				props.directTo(`/member/health/${props.params.userID}`)
			}, 50)
			return addResultInfo
		}

		const queryData = {
			method: 'DELETE',
			querys: {
				name,
				goal,
				desc,
				measure
			}
		}
		this.props.fetchList(
			`/fitness/fit_goal/${this.goalID}/?user_id=${props.params.userID}`,
			queryData,
			'addResultInfo',
			addResultInfoFilter
		)
	}

	render() {
		// const fitgoal = this.props.fitGoalInfo.fit_goal || {}
		const props = this.props
		let deleteEle
		if (this.props.upDateStatus) {
			deleteEle = (
				<div className="add-confirm add-cancel" onClick={this.deleteGoal}>删除</div>
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
			<div className="container add-course-wrap">
				<div className="add-course-main">
					<div className="add-course-item add-course-time">
						<span>目标名称</span>
						<input
							type="text" name="name" placeholder="输入目标名称"
							ref="name_ref"
							className="add-course-info add-course-time"
							required
						/>
					</div>
					<div className="add-course-item add-course-time">
						<span>目标单位</span>
						<input
							type="text" placeholder="输入单位，如KG"
							ref="measure_ref" name="measure"
							className="add-course-info add-course-time"
							required
						/>
					</div>
					<div className="add-course-item add-course-time">
						<span>目标数值</span>
						<input
							type="number" placeholder="输入目标值"
							ref="goal_ref" name="goal"
							className="add-course-info add-course-time"
							required
						/>
					</div>
					<div className="add-course-item add-course-time">
						<span>备注说明</span>
						<textarea
							placeholder="输入说明" className="add-course-textarea"
							ref="desc_ref" name="desc"
						/>
					</div>
				</div>
				<div className="add-confirm" onClick={this.confirmGoal}>确认</div>
				{deleteEle}
				{popupEle}
			</div>
		)
	}
}
