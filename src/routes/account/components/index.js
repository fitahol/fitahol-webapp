/**
 * Created by madeling on 8/1/16.
 */
import React, { PropTypes } from 'react'
import Popup from '../../../components/popup'
import Profile from './profile'
import $storage from '../../../services/storage'
import { CardHeader, Avatar } from '../../../public/materialUi'

class ProfileEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		userInfo: PropTypes.object.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired
	}

	static defaultProps = {
		userInfo: {
			coach: {},
			unread_count: 0,
			user: {}
		}
	}

	constructor(props) {
		super(props)
		this.enterPersonal = this.enterPersonal.bind(this)
	}

	componentWillMount() {
		const self = $storage.local.get('self') || 0
		if (this.props.modalState) {
			this.props.modalClose()
		}
		function filter(userInfo) {
			if (userInfo.unread_count) {
				$storage.local.set('unread_count', userInfo.unread_count)
			} else {
				$storage.local.remove('unread_count')
			}
			return userInfo
		}
		this.props.fetchList(
			`/account/${self}/`,
			undefined,
			'userInfo',
			filter
		)
	}
	enterPersonal() {
		this.props.directTo('/personal-center')
	}

	render() {
		const props = this.props
		const userInfo = props.userInfo || {}
		const userData = userInfo.user || {}
		const userInfoHeaderEle = (
			<CardHeader
				title={`用户ID: ${userData.id || ''}`}
				subtitle={<p> 用户昵称: {userData.nickname || '暂无(戳我去修改)'} <br />
					绑定手机: {userData.phone || '暂无'}</p>}
				avatar={<Avatar src={userData.portrait} />}
				className="my-avatar avatar-list"
				onClick={this.enterPersonal}
			/>
		)

		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''

		return (
			<div className="container account-page">
				{userInfoHeaderEle}
				<Profile
					directTo={props.directTo}
					unread_count={userInfo.unread_count}
					modalOpen={props.modalOpen}
				/>
				{popupEle}
			</div>
		)
	}
}

export default ProfileEle
