import React, { PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'
import CourseRecord from './courseRecord'
import CourseHealthComEle from '../../../components/courseHealthCom'
import { Delete } from '../../../public/materialUi'

export default class courseEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		courseRecord: PropTypes.array.isRequired,
		params: PropTypes.object.isRequired,
		lastCourseInfo: PropTypes.object.isRequired,
		editorIndex: PropTypes.number.isRequired,
		purchasedCourseData: PropTypes.object.isRequired,
		modifyResult: PropTypes.object.isRequired
	}

	static defaultProps = {
		courseRecord: []
	}

	constructor(props) {
		super(props)
		this.getActionList = this.getActionList.bind(this)
		this.deleteCourse = this.deleteCourse.bind(this)
		this.eventID = $storage.local.get('event_id')
		this.userID = $storage.local.get('user_id') || this.props.params.userID
		this.uType = +$storage.local.get('uType')
	}

	componentWillMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
		this.getActionList()
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

	getActionList() {
		this.props.fetchList(
		`/fitness/exercise_record/?user_id=${this.userID}&event_id=${this.eventID}`,
			{
				querys: { time: Date.now() }
			},
			'courseRecord'
		)
	}

	deleteCourse() {
		const props = this.props
		function deleteLink() {
			props.directTo('/')
		}
		function deleteFilter(deleteResult) {
			if (deleteResult.code >= 200 && deleteResult.code < 300) {
				setTimeout(deleteLink, 10)
			}
		}
		this.props.fetchList(
			`/schedule/event/${this.eventID}/?user_id=${this.userID}`,
			{
				method: 'DELETE'
			},
			'deleteResult',
			deleteFilter
		)
	}

	render() {
		const props = this.props
		let courseContentEle
		courseContentEle = (
			<CourseRecord
				courseRecord={props.courseRecord}
				fetchList={props.fetchList}
				valChange={props.valChange}
				modalOpen={props.modalOpen}
				directTo={props.directTo}
				editorIndex={props.editorIndex}
				purchasedCourseData={props.purchasedCourseData}
				params={props.params}
				modifyResult={props.modifyResult}
				getActionList={this.getActionList}
			/>
			)

		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''

		let deleteCourseEle = this.uType ?
			<Delete className="delete-icon" onTouchTap={this.deleteCourse} /> : ''
		return (
			<div className="container member-health-wrap">
				<CourseHealthComEle
					params={props.params}
					modalOpen={props.modalOpen}
					directTo={props.directTo}
					fetchList={props.fetchList}
					lastCourseInfo={props.lastCourseInfo}
				/>
				{deleteCourseEle}
				{courseContentEle}
				{popupEle}
			</div>
		)
	}
}
