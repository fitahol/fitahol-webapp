import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import $storage from '../../services/storage'
import { FontIcon, BottomNavigation, BottomNavigationItem, Paper } from '../../public/materialUi'

const recentsIcon = <FontIcon className="material-icons">today</FontIcon>
const favoritesIcon = <FontIcon className="material-icons">contacts</FontIcon>
const nearbyIcon = <FontIcon className="material-icons">account_box</FontIcon>


class Footer extends React.Component {
	static propTypes = {
		tabNum: PropTypes.number,
		unreadCount: PropTypes.number
	}
	static defaultProps = { tabNum: 0 }
	render() {
		const uType = $storage.local.get('uType')
		const selfID = +$storage.local.get('self')
		let footTabList = [
				{ label: '身体记录', icon: recentsIcon, link: `/member/health/${selfID}` },
				{ label: '课程记录', icon: favoritesIcon, link: '/course-record' },
				{ label: '我的', icon: nearbyIcon, link: '/account' }
		]
		if (uType === '1') {
			footTabList = [
				{ label: '课程', icon: recentsIcon, link: '/' },
				{ label: '学员', icon: favoritesIcon, link: '/member' },
				{ label: '我的', icon: nearbyIcon, link: '/account' }
			]
		}

		const unreadCountEle = this.props.unreadCount > 0 ?
			<span className="unread-mark"></span> : ''

		return (
			<footer className="footer">
				<Paper zDepth={1}>
					<BottomNavigation selectedIndex={this.props.tabNum}>
					{
							footTabList.map((item, index) => (
								<BottomNavigationItem
									key={index}
									label={item.label}
									icon={item.icon}
									containerElement={<Link to={item.link} />}
								/>
							))
						}
					</BottomNavigation>
					{unreadCountEle}
				</Paper>
			</footer>
		)
	}
}

export default Footer
