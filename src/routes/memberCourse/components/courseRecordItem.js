
import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import { toast } from '../../../services/util'
import $storage from '../../../services/storage'
import { RaisedButton, Delete } from '../../../public/materialUi'

import '../../memberHealth/components/style.scss'

export default class CourseRecordItemEle extends React.Component {
	static propTypes = {
		courseRecordItem: PropTypes.object.isRequired,
		fetchList: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		modalOpen: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		getActionList: PropTypes.func.isRequired,
		modifyResult: PropTypes.object.isRequired,
		itemIndex: PropTypes.number
	}

	constructor(props) {
		super(props)
		this.changeEditorIndex = this.changeEditorIndex.bind(this)
		this.reduceWeight = this.reduceWeight.bind(this)
		this.addWeight = this.addWeight.bind(this)
		this.reduceTimes = this.reduceTimes.bind(this)
		this.addTimes = this.addTimes.bind(this)
		this.cancelModify = this.cancelModify.bind(this)
		this.confirmModify = this.confirmModify.bind(this)
		this.deleteItemAction = this.deleteItemAction.bind(this)
		this.uType = +$storage.local.get('uType')
	}

	changeEditorIndex() {
		const props = this.props
		props.valChange(props.itemIndex, 'editorIndex')
	}

	reduceWeight() {
		if (!this.uType) {
			toast('您暂时没有修改权限哦！')
			return
		}
		this.changeEditorIndex()
		const weightInputValue = this.refs.weightInput.value
		if (+weightInputValue < 0) {
			toast('不能更少了哦')
			return
		}
		this.refs.weightInput.value = +weightInputValue - 1
	}
	addWeight() {
		if (!this.uType) {
			toast('您暂时没有修改权限哦！')
			return
		}
		this.changeEditorIndex()
		const weightInputValue = this.refs.weightInput.value
		this.refs.weightInput.value = +weightInputValue + 1
	}

	reduceTimes() {
		if (!this.uType) {
			toast('您暂时没有修改权限哦！')
			return
		}
		this.changeEditorIndex()
		const timesValue = +this.refs.timesInput.value
		if (timesValue < 0) {
			toast('不能更少了哦')
			return
		}
		this.refs.timesInput.value = +timesValue - 1
	}
	addTimes() {
		if (!this.uType) {
			toast('您暂时没有修改权限哦！')
			return
		}
		this.changeEditorIndex()
		const timesValue = +this.refs.timesInput.value
		this.refs.timesInput.value = timesValue + 1
	}
	cancelModify() {
		this.refs.weightInput.value = this.props.courseRecordItem.value
		this.refs.timesInput.value = this.props.courseRecordItem.number
		this.props.valChange(-1, 'editorIndex')
	}
	confirmModify(methodInfo) {
		const props = this.props
		const userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
		const eventID = props.courseRecordItem.event_id || ''
		function handleResult() {
			props.valChange(-1, 'editorIndex')
			if (methodInfo === 'DELETE') {
				// props.getActionList()
				location.reload()
			}
		}
		function filter(modifyResult) {
			setTimeout(handleResult, 10)
			return modifyResult
		}
		props.fetchList(
		`/fitness/exercise_record/${props.courseRecordItem.id}/?user_id=${userID}&event_id=${eventID}`,
			{
				method: methodInfo,
				params: {
					number: this.refs.timesInput.value,
					value: this.refs.weightInput.value
				}
			},
			'modifyResult',
			filter
		)
	}

	deleteItemAction() {
		const that = this
		const props = this.props
		if (!this.uType) {
			toast('您暂时没有修改权限哦！')
			return
		}
		props.modalOpen({
			content: `确认删除动作:${props.courseRecordItem.exercise.name}？`,
			confirm: '确认',
			confirmCallback: () => {
				that.confirmModify('DELETE')
			}
		})
	}

	render() {
		const that = this
		const props = this.props
		const courseRecordItem = props.courseRecordItem || {}
		const exercise = courseRecordItem.exercise || {}
		const weightActionEle = (
			<div className="action-desc-item">
				<span>重量</span>
				<div>
					<span onClick={this.reduceWeight}>-</span>
					<input
						type="number"
						defaultValue={props.courseRecordItem.value}
						ref="weightInput"
						onChange={this.changeEditorIndex}
					/>
					<span onClick={this.addWeight}>+</span>
				</div>
			</div>
		)

		const timesActionEle = (
			<div className="action-desc-item action-desc-time">
				<span>次数</span>
				<div>
					<span onClick={this.reduceTimes}>-</span>
					<input
						type="number"
						defaultValue={props.courseRecordItem.number}
						ref="timesInput"
						onChange={this.changeEditorIndex}
					/>
					<span onClick={this.addTimes}>+</span>
				</div>
			</div>
		)

		let actionModifyEle

		if (props.courseRecordItem.value && props.editorIndex === props.itemIndex) {
			actionModifyEle = (
				<div className="action-modify">
					<RaisedButton
						label="取消"
						className="raise-btn action-modify-left action-modify-btn"
						onTouchTap={this.cancelModify}
					/>
					<RaisedButton
						label="确认"
						primary={true}
						className="raise-btn action-modify-btn"
						onTouchTap={this.confirmModify.bind(this, 'PATCH')}
					/>
				</div>
			)
		}

		const deleteItemEle = (
			<Delete className="delete-item-icon" onTouchTap={this.deleteItemAction} />
		)
		return (
			<div className="action-list-item">
				<div className="action-name" data-content={exercise.name}>
					<img
						src={exercise.icon_url}
						alt="action name"
					/>
				</div>
				<div className="action-desc">
					{weightActionEle}
					{timesActionEle}
				</div>
				{actionModifyEle}
				{deleteItemEle}
			</div>
		)
	}
}
