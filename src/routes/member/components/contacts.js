/**
 * Created by madeling on 7/21/16.
 */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import $storage from '../../../services/storage'
import { Avatar, pinkA200, SearchIcon, AddIcon,
	List, ListItem, transparent } from '../../../public/materialUi'

export default class MemberList extends React.Component {
	static propTypes = {
		response: PropTypes.array.isRequired
	}

	static defaultProps = {
		response: []
	}

	enterMemberHealth(userID) {
		$storage.local.set('user_id', userID)
		$storage.local.set('courseHealthBack', '/member')
	}

	render() {
		const listItemStyle = {
			borderBottom: '1px solid #f4f5f6',
			margin: '0 .583rem',
			backgroundColor: '#fff'
		}
		const rightAvatarStyle = {
			position: 'absolute',
			right: 0,
			width: '30px'
		}

		const addMemberSearchEle = (
			<div className="add-member-search">
				<SearchIcon color="#999" />
				搜索
			</div>
		)
		const newMemberEle = (
			<List className="mermber-list">
				<ListItem
					leftAvatar={
						<Avatar
							icon={<AddIcon />}
							backgroundColor="#ff4081"
						/>
					}
					primaryText="新朋友"
					style={listItemStyle}
					containerElement={<Link to={'add-member'} />}
				/>
			</List>
		)

		const memberListEle = (
			<List className="mermber-list">
				{this.props.response.map((item, index) => (
					<ListItem
						key={index}
						rightAvatar={
							<Avatar
								color={pinkA200} backgroundColor={transparent}
								style={rightAvatarStyle}
							>
								{item.first_letter}
							</Avatar>
						}
						primaryText={item.nickname}
						leftAvatar={<Avatar src={item.portrait} />}
						containerElement={<Link to={`/member/health/${item.user_id}`} />}
						style={listItemStyle}
						className="avater-item"
						onTouchTap={this.enterMemberHealth.bind(this, item.user_id)}
					/>
					))}
			</List>
		)

		return (
			<div className="container member-container">
				{/* addMemberSearchEle */}
				{newMemberEle}
				{memberListEle}
			</div>
		)
	}
}
