/**
 * Created by madeling on 7/26/16.
 */
import React, { PropTypes } from 'react'
import './style.scss'
import Avatar from 'material-ui/Avatar'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import $storage from '../../../services/storage'
import { List, ListItem, RaisedButton, ContentAddCircle } from '../../../public/materialUi'

import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export default class HealthRecord extends React.Component {
	static propTypes = {
		directTo: PropTypes.func.isRequired,
		fitGoal: PropTypes.array.isRequired,
		userID: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props)
		this.editorFitGoal = this.editorFitGoal.bind(this)
		this.addGoalRecord = this.addGoalRecord.bind(this)
		this.enterHealthRecord = this.enterHealthRecord.bind(this)
	}

	editorFitGoal(goalID, event) {
		event.stopPropagation()
		event.preventDefault()
		const props = this.props
		if (goalID) {
			$storage.local.set('goalID', goalID)
		} else {
			$storage.local.remove('goalID')
		}
		props.directTo(`/add-fitgoal/${props.userID}`)
	}

	addGoalRecord(goalID, event) {
		event.stopPropagation()
		event.preventDefault()
		const props = this.props
		$storage.local.set('goalID', goalID)
		props.directTo(`/add-goal-record/${this.props.userID}`)
	}

	enterHealthRecord(id) {
		$storage.local.set('fit_goal_id', id)
		this.props.directTo('/health-record')
	}

	render() {
		let fitGoalElt
		if (this.props.fitGoal.length > 0) {
			fitGoalElt = (
				<List>
					{this.props.fitGoal.map((item, index) => (
						<div
							className="goalElt"
							key={index}
							onClick={this.enterHealthRecord.bind(this, item.id)}
						>
							<ListItem
								className="editor-goal-title"
								leftAvatar={
									<Avatar
										onClick={this.editorFitGoal.bind(this, item.id)}
										icon={<ImageEdit />} size={30} className="editor-goal-icon"
									/>
								}
								primaryText={
									<div>
										{item.name}
										: {item.goal} {item.measure}
									</div>
								}
								rightIconButton={
									<RaisedButton
										label="添加记录"
										className="add-record-btn"
										onClick={this.addGoalRecord.bind(this, item.id)}
									/>
								}
							/>
							<LineChart
								width={300}
								height={200}
								data={item.goal_record}
							>
								<XAxis
									dataKey="cdate"
									height={50}
									padding={{ right: 20 }}
								/>
								<YAxis hide={true} domain={['dataMin-10', 'dataMax+10']} />
								<Tooltip />
								<Line
									type="monotone"
									dataKey="current"
									stroke="#8884d8"
									fill="#8884d8"
								/>
							</LineChart>
						</div>
					))}
				</List>
			)
		} else {
			fitGoalElt = (
				<div className="no-record">
					您还没有添加任何记录
				</div>
			)
		}

		return (
			<div>
				{fitGoalElt}
				<RaisedButton
					label="新健身目标"
					icon={<ContentAddCircle />}
					onTouchTap={this.editorFitGoal.bind(this, 0)}
					className="add-fit-goal"
				/>
			</div>
		)
	}
}
