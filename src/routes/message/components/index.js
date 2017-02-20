/**
 * Created by madeling on 8/1/16.
 */
import React, { PropTypes } from 'react'
import Notifications from './notifications'

class MessageEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		notify: PropTypes.object.isRequired
	}

	componentWillMount() {
		this.props.fetchList(
			'/notification/',
			undefined,
			'notify'
		)
	}

	render() {
		return (
			<Notifications
				notify={this.props.notify}
			/>
		)
	}
}

export default MessageEle
