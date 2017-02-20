/**
 * Created by madeling on 7/21/16.
 */
import React, { PropTypes } from 'react'
import $storage from '../../../services/storage'
import { NavigationChevronRight,
List, ListItem, Avatar, FontIcon, ActionSettings, ActionFavorite } from '../../../public/materialUi'
import { Link } from 'react-router'
import './profile.scss'

export default class Account extends React.Component {
	static propTypes = {
		modalOpen: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		unread_count: PropTypes.number
	}

	static defaultProps = {
		unread_count: 0
	}

	logout() {
		localStorage.clear()
		this.props.directTo('/login')
	}

	render() {
		const props = this.props
		const unreadCountEle = props.unread_count ?
			<span className="unread-mark"></span> : ''
		let addCoachEle
		if (!+$storage.local.get('uType')) {
			addCoachEle = (
				<ListItem
					className="my-avatar-item"
					leftAvatar={
						<Avatar icon={<ActionFavorite />} color="#F50057" />
					}
					rightIcon={<NavigationChevronRight />}
					primaryText="我的教练"
					containerElement={<Link to="/coach-list" />}
				/>
			)
		}

		const listItemStyle = {
			borderBottom: '1px solid #f4f5f6',
			margin: '0 .583rem',
			backgroundColor: '#fff'
		}

		return (
			<List className="my-avatar-list">
				<ListItem
					className="my-avatar-item"
					leftAvatar={<Avatar icon={<FontIcon className="material-icons">message</FontIcon>} />}
					rightIcon={<NavigationChevronRight />}
					primaryText="我的消息"
					containerElement={<Link to="/message" />}
					style={listItemStyle}
				/>
				{unreadCountEle}
				<ListItem
					className="my-avatar-item"
					leftAvatar={
						<Avatar
							icon={<FontIcon className="material-icons">pie_chart</FontIcon>}
						/>}
					rightIcon={<NavigationChevronRight />}
					primaryText="课程统计"
					containerElement={<Link to="/course/charts" />}
					style={listItemStyle}
				/>
				<ListItem
					className="my-avatar-item"
					leftAvatar={
						<Avatar icon={<ActionSettings />} color="#F50057" />
					}
					rightIcon={<NavigationChevronRight />}
					primaryText="手机绑定"
					containerElement={<Link to="/reset-phone" />}
					style={listItemStyle}
				/>
				{addCoachEle}
				<ListItem
					className="my-avatar-item"
					leftAvatar={
						<Avatar
							icon={<FontIcon className="material-icons">clear</FontIcon>}
						/>}
					rightIcon={<NavigationChevronRight />}
					onClick={this.logout.bind(this)}
					primaryText="退出登录"
				/>
			</List>
		)
	}
}
