/**
 * Created by madeling on 7/23/16.
 */
import React, { PropTypes } from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router'

import classes from './styles.scss'

const EmptyMessage = () => (
	<List>
		<ListItem
			className={classes.emptyMsg}
			primaryText="您还没有消息记录"
		/>
	</List>
)

const MessageList = (props) => (
	<div>
		<List>
			{props.results.map((item, index) => (
				<ListItem
					key={index}
					leftAvatar={<Avatar src="http://img1.imgtn.bdimg.com/it/u=2711568380,1516463747&fm=21&gp=0.jpg" />}
					primaryText={
						<p>{item.title}</p>
					}
					secondaryText={
						<p>
							<span className={classes.rightAlign}>{item.show_time}</span>
						</p>
					}
					secondaryTextLines={2}
					containerElement={<Link to={`/message/${item.id}`} />}
					className="message-item"
				/>
			))}
		</List>
	</div>
)

export default class Notify extends React.Component {
	static propTypes = {
		notify: PropTypes.object.isRequired,
		results: PropTypes.array
	}

	render() {
		let notifyEle
		if (this.props.notify.count === 0) {
			notifyEle = <EmptyMessage />
		} else {
			notifyEle = <MessageList results={this.props.notify.results} />
		}
		return (
			<div className="container">
				<div className="main notify">
					{notifyEle}
				</div>
			</div>
		)
	}
}
