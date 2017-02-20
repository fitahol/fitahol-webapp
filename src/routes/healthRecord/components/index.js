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
		healthRecordList: PropTypes.array.isRequired
	}
	static defaultProps = {
		healthRecordList: []
	}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
		const userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
		this.props.fetchList(
			`/fitness/goal_record/?user_id=${userID}`,
			{
				querys: {
					fit_goal_id: $storage.local.get('fit_goal_id'),
					time: Date.now()
				}
			},
			'healthRecordList'
		)
	}

	render() {
		const props = this.props
		const healthRecordList = props.healthRecordList
		let healthRecordListEle
		if (healthRecordList.length) {
			healthRecordListEle = (
				healthRecordList.map((item, index) => (
					<div
						key={index}
						className="course-record-list list-item"
					>
						<CardHeader
							title={item.current}
							subtitle={`课程描述：${item.current_desc}`}
							className="avatar-list"
						/>
						<p className="list-item-right">{item.cdate}</p>
					</div>
				))
			)
		} else {
			healthRecordListEle = (
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
				{healthRecordListEle}
				{popupEle}
			</div>
		)
	}
}

export default CourseRecordEle
