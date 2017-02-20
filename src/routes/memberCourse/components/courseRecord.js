
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { RaisedButton } from '../../../public/materialUi'
import { toast } from '../../../services/util'
import $storage from '../../../services/storage'
import CourseRecordItemEle from './courseRecordItem'

export default class CourseRecordEle extends React.Component {
	static propTypes = {
		courseRecord: PropTypes.array.isRequired,
		fetchList: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		modalOpen: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		getActionList: PropTypes.func.isRequired,
		editorIndex: PropTypes.number.isRequired,
		params: PropTypes.object.isRequired,
		purchasedCourseData: PropTypes.object.isRequired,
		modifyResult: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props)
		this.modifyCourse = this.modifyCourse.bind(this)
		this.addCourseAction = this.addCourseAction.bind(this)
		this.uType = +$storage.local.get('uType')
	}

	componentWillMount() {
		const userID = $storage.local.get('user_id') || this.props.params.userID
		function purchasedFilter(purchasedCourseData) {
			const result = purchasedCourseData
			result.alreadyCourse = result.amount - result.remain
			return result
		}
		this.props.fetchList(
			`/schedule/course/purchased/?user_id=${userID}`,
			{
				querys: { time: Date.now() }
			},
			'purchasedCourseData',
			purchasedFilter
		)
	}
	modifyCourse() {
		if (this.uType) {
			this.props.directTo('/add-course')
		} else {
			toast('您暂时没有修改权限')
		}
	}
	addCourseAction() {
		if (this.uType) {
			this.props.directTo('/add-action')
		} else {
			toast('您暂时没有修改权限')
		}
	}

	render() {
		const props = this.props
		const courseRecord = props.courseRecord
		const purchasedCourseData = props.purchasedCourseData
		let actionListEle

		if (courseRecord.length) {
			actionListEle = (
				<div className="action-list">
					{
						courseRecord.map((item, index) => (
							<CourseRecordItemEle
								key={index}
								itemIndex={index}
								courseRecordItem={item}
								fetchList={props.fetchList}
								valChange={props.valChange}
								modalOpen={props.modalOpen}
								directTo={props.directTo}
								getActionList={props.getActionList}
								editorIndex={props.editorIndex}
								modifyResult={props.modifyResult}
							/>
						))
					}
				</div>
			)
		} else {
			actionListEle = (
				<div className="no-record">
					您还没有添加任何记录
				</div>
			)
		}

		return (
			<div className="course-record">
				<div className="add-course">
					<p>已购课程{purchasedCourseData.amount}课时。完成{purchasedCourseData.alreadyCourse}节，剩余{purchasedCourseData.remain}节。</p>
					<div className="add-course-btn">
						<RaisedButton
							label="历史课时"
							containerElement={<Link to="/course-record" />}
							backgroundColor="#edf0f5"
							className="raise-btn add-course-btn-first"
						/>
						<RaisedButton
							label="修改课时"
							backgroundColor="#76c639"
							onClick={this.modifyCourse}
							className="raise-btn modify-btn"
						/>
					</div>
				</div>
				{actionListEle}
				<div className="footer-course">
					<RaisedButton
						label="添加动作"
						backgroundColor="#fe5900"
						className="footer-course-btn"
						onClick={this.addCourseAction}
					/>
					<RaisedButton
						label="结束课程"
						backgroundColor="#76c639"
						className="footer-course-btn"
						containerElement={<Link to="/" />}
					/>
				</div>
			</div>
		)
	}
}
