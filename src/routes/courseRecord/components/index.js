import React, { PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'
import { CardHeader, Avatar } from '../../../public/materialUi'


class CourseRecordEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		courseRecordList: PropTypes.array.isRequired
	}
	static defaultProps = {
		courseRecordList: []
	}
	constructor(props) {
		super(props)
		this.enterMemberCourse = this.enterMemberCourse.bind(this)
	}

	componentDidMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
		const userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
		this.props.fetchList(
			`/schedule/event/?user_id=${userID}`,
			{
				querys: {
					time: Date.now()
				}
			},
			'courseRecordList'
		)
	}

	enterMemberCourse(eventID, start) {
		const userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
		const year = start.substr(0, 4)
		const month = start.substr(5, 2)
		const day = start.substr(8, 2)
		const hour = start.substr(11, 2)
		$storage.local.set('year', year)
		$storage.local.set('month', month)
		$storage.local.set('day', day)
		$storage.local.set('hour', hour)
		$storage.local.set('event_id', eventID)
		this.props.directTo(`/member/course/${userID}`)
	}

	render() {
		const props = this.props
		const courseRecordList = props.courseRecordList
		let courseRecordListEle
		if (courseRecordList.length) {
			courseRecordListEle = (
				courseRecordList.map((item, index) => {
					const userInfo = item.user || {}
					const start = item.start.substr(0, item.start.length - 3) || ''
					const end = item.end.substr(10, 5) || ''
					return (
						<div
							key={index}
							className="course-record-list"
							onClick={this.enterMemberCourse.bind(this, item.id, item.start)}
						>
							<CardHeader
								title={`昵称：${userInfo.nickname}`}
								subtitle={`课程时间：${start}至${end}`}
								avatar={<Avatar src={userInfo.portrait} />}
								className="avatar-list"
							/>
							<span className="next-icon"></span>
						</div>
					)
				})
			)
		} else {
			courseRecordListEle = (
				<div className="no-record">您还没有相关记录哟</div>
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
			<div className="container">
				{courseRecordListEle}
				{popupEle}
			</div>
		)
	}
}

export default CourseRecordEle
