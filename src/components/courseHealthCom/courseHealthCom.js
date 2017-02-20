import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import $storage from '../../services/storage'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { urlPathParse, toDou } from '../../services/util'

class CourseHealthCom extends React.Component {
	static propTypes = {
		directTo: PropTypes.func.isRequired,
		fetchList: PropTypes.func.isRequired,
		params: PropTypes.object.isRequired,
		lastCourseInfo: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props)
		this.enterLink = this.enterLink.bind(this)
		this.pathname = urlPathParse(location.pathname)
		this.userID = $storage.local.get('user_id') || this.props.params.userID
	}
	componentDidMount() {
		const that = this
		if (this.pathname === 'member-health') {
			this.props.fetchList(
				`/schedule/event/last/?user_id=${that.userID}`,
				{ querys: {
					time: Date.now()
				} },
				'lastCourseInfo'
			)
		} else {
			this.props.fetchList(
				`/fitness/fit_goal/last/?user_id=${that.userID}`,
				{ querys: {
					time: Date.now()
				} },
				'lastCourseInfo'
			)
		}
	}

	enterLink() {
		const that = this
		const lastCourseInfo = this.props.lastCourseInfo || {}
		function formatPostDateT(info) {
			let result = info.replace(/\s/, 'T')
			result = new Date(result)
			return result
		}
		if (this.pathname === 'member-health') {
			const eventID = lastCourseInfo.id
			if (eventID) {
				$storage.local.set('event_id', eventID)
			}

			if (lastCourseInfo.end) {
				const formatEnd = formatPostDateT(lastCourseInfo.end)
				$storage.local.set('year', formatEnd.getUTCFullYear())
				$storage.local.set('month', formatEnd.getUTCMonth() + 1)
				$storage.local.set('day', formatEnd.getUTCDate())
				$storage.local.set('minutes', toDou(formatEnd.getUTCMinutes()))
				$storage.local.set('hour', toDou(formatEnd.getUTCHours()))
				this.props.directTo(`/member/course/${that.userID}`)
			} else {
				this.props.directTo('/course-record')
			}
		} else {
			if (lastCourseInfo.name) {
				this.props.directTo(`/member/health/${that.userID}`)
			} else {
				this.props.directTo(`/add-fitgoal/${that.userID}`)
			}
		}
	}

	render() {
		const lastCourseInfo = this.props.lastCourseInfo || {}
		const userInfo = lastCourseInfo.user || {}
		const goalRecord = lastCourseInfo.goal_record || { cdate: '', current_desc: '' }

		let lastInfo
		if (this.pathname === 'member-health') {
			if (lastCourseInfo.end) {
				lastInfo = `最近课程: ${lastCourseInfo.end}`
			} else {
				lastInfo = '暂无新课程，查看历史'
			}
		} else {
			if (lastCourseInfo.name) {
				lastInfo = `最近状态: ${goalRecord.cdate}${lastCourseInfo.name}${goalRecord.current_desc}`
			} else {
				lastInfo = '暂无状态更新，现在添加'
			}
		}
		return (
			<div className="course-health-comwrap" onClick={this.enterLink}>
				<ListItem
					leftAvatar={
						<Avatar src={userInfo.portrait} />
					}
				>
					<p className="course-health-comitem">{lastInfo}</p>
				</ListItem>
				<span className="next-icon"></span>
			</div>
		)
	}
}

export default	CourseHealthCom
