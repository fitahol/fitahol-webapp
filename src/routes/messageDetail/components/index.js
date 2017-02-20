/**
 * Created by madeling on 8/1/16.
 */
import React, { PropTypes } from 'react'
import NotificationDetail from './notificationDetail'

class indexEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		params: PropTypes.object.isRequired,
		response: PropTypes.object.isRequired
	}
	componentWillMount() {
		this.props.fetchList(
			`/notification/${this.props.params.messageID}/`,
			undefined,
			'response'
		)
	}
	render() {
		const response = this.props.response
		return (
			<div className="container">
				<NotificationDetail
					{...response}
				/>
			</div>
		)
	}
}

export default indexEle
