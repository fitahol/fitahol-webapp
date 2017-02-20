import React, { PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'


class AddCourseEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		addResult: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
		this.handleChangeType = this.handleChangeType.bind(this)
		this.buildConfirm = this.buildConfirm.bind(this)
	}
	componentDidMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
	}
	handleChangeType() {
		console.log(2)
	}
	buildConfirm() {
		const props = this.props
		const userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
		const addCourseTime = this.refs.addCourseTime.value || 1
		function filter(addResult) {
			if (addResult.code === 200) {
				setTimeout(() => {
					props.directTo(`/member/course/${userID}`)
				}, 5)
			}
			return addResult
		}
		this.props.fetchList(
			'/schedule/course/',
			{
				method: 'POST',
				params: {
					user_id: userID,
					remain: addCourseTime
				}
			},
			'addResult',
			filter
		)
	}
	render() {
		const props = this.props
		// const addDCourseTypeEle = (
		// 	<div className="add-course-item add-course-type">
		// 		<span>课程类型</span>
		// 		<div className="add-course-info">
		// 			<SelectField
		// 				value={props.repeatCourseType}
		// 				onChange={this.handleChangeRepeatType}
		// 				className="select-type-wrap"
		// 			>
		// 				<MenuItem value={1} primaryText="私教课" />
		// 				<MenuItem value={2} primaryText="练习课" />
		// 			</SelectField>
		// 		</div>
		// 	</div>
		// )
		const addCourseTimeEle = (
			<div className="add-course-item add-course-time">
				<span>课时</span>
				<input
					type="text"
					placeholder="1"
					className="add-course-info add-course-time"
					ref="addCourseTime"
				/>
				<span>节</span>
			</div>
		)

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
					{addCourseTimeEle}
				</div>
				<div className="add-confirm" onClick={this.buildConfirm}>确认</div>
				{popupEle}
			</div>
		)
	}
}

export default AddCourseEle
