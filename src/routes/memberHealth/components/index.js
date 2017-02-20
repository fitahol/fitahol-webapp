/**
 * Created by madeling on 8/1/16.
 */
import React, { PropTypes } from 'react'
import HealthRecord from './healthRecord'
import Popup from '../../../components/popup'
import CourseHealthComEle from '../../../components/courseHealthCom'
import $storage from '../../../services/storage'


export default class HealthEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		fitGoal: PropTypes.array.isRequired,
		lastCourseInfo: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired
	}

	static defaultProps = {
		fitGoal: [],
		goalRecord: []
	}

	constructor(props) {
		super(props)
		this.userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
	}

	componentWillMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
		this.props.fetchList(
			`/fitness/fit_goal/?user_id=${this.userID}`,
			{ querys: {
				time: Date.now()
			} },
			'fitGoal',
			undefined
		)
	}

	ComponentDidMount() {
		const screenHeight = Math.max(document.documentElement.clientHeight || window.innerHeight)
		function fontResize() {
			const width = document.body.offsetWidth
			const fontSize = width / 320 * 12
			document.querySelector('html').style.fontSize = `${fontSize}px`
			return fontSize
		}
		document.querySelector('.container').style.minHeight =
		`${screenHeight - fontResize() * 3.33 - 56}px`
	}

	render() {
		const props = this.props
		const fitGoal = props.fitGoal
		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''
		return (
			<div className="container member-health-wrap">
				<CourseHealthComEle
					params={props.params}
					fetchList={props.fetchList}
					directTo={props.directTo}
					lastCourseInfo={props.lastCourseInfo}
				/>
				<HealthRecord
					fitGoal={fitGoal}
					userID={props.params.userID}
					directTo={props.directTo}
				/>
				{popupEle}
			</div>
		)
	}
}
