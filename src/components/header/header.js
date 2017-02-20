import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationBack from 'material-ui/svg-icons/image/navigate-before'
// import { urlPathParse } from '../../services/util'
// import $storage from '../../services/storage'
// import { AppBar, IconButton, NavigationBack } from '../../public/materialUi'

export default class Header extends React.Component {

	static propTypes = {
		headerMessage: PropTypes.object
	}

	render() {
		const headerMessage = this.props.headerMessage || {}
		// const backLink = $storage.local.get('courseHealthBack') || '/'
		let HeaderEle
		if (headerMessage.back) {
			HeaderEle = (
				<AppBar
					title={headerMessage.title}
					iconElementLeft={
						<IconButton onTouchTap={headerMessage.goBack} className="navigation-back">
							<NavigationBack />
						</IconButton>
					}
				/>
			)
			// else {
			// 	HeaderEle = (
			// 		<AppBar
			// 			title={headerMessage.title}
			// 			iconElementLeft={
			// 				<IconButton>
			// 					<NavigationBack />
			// 					containerElement={<Link to={backLink} />}
			// 				</IconButton>
			// 			}
			// 		/>
			// )
			// }
		} else {
			HeaderEle = (
				<AppBar
					title={headerMessage.title}
					showMenuIconButton={false}
				/>
			)
		}
		return (
			<div className="header">
				{HeaderEle}
			</div>
		)
	}
}
