import React, { PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'
import { List, ListItem, Avatar, Drawer, RaisedButton } from '../../../public/materialUi'
import { toast } from '../../../services/util'

class AddActionEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		rootSelectIndex: PropTypes.number.isRequired,
		drawerStatus: PropTypes.bool.isRequired,
		categoryInfo: PropTypes.array.isRequired,
		categoryChildInfo: PropTypes.array.isRequired,
		addActionResult: PropTypes.object.isRequired,
		currenAction: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props)
		this.getCategoryChildInfo = this.getCategoryChildInfo.bind(this)
		this.hanleChangeRoot = this.hanleChangeRoot.bind(this)
		this.hanleChangeAction = this.hanleChangeAction.bind(this)
		this.toggleDrawer = this.toggleDrawer.bind(this)
		this.addAction = this.addAction.bind(this)
	}
	componentDidMount() {
		const props = this.props
		if (this.props.modalState) {
			this.props.modalClose()
		}
		props.fetchList(
			'/fitness/category/',
			undefined,
			'categoryInfo',
			undefined
		)
		this.getCategoryChildInfo(1)
	}

	getCategoryChildInfo(id) {
		const props = this.props
		// props.valChange(index, 'rootSelectIndex')
		function filter(categoryChildInfo) {
			return categoryChildInfo
		}
		props.fetchList(
			`/fitness/exercise/?category_id=${id}`,
			undefined,
			'categoryChildInfo',
			filter
		)
	}
	hanleChangeRoot(id) {
		this.getCategoryChildInfo(id)
	}
	hanleChangeAction(currentItem) {
		$storage.session.set('action_id', currentItem.id)
		this.props.valChange(true, 'drawerStatus')
		this.props.valChange(currentItem, 'currenAction')
	}
	toggleDrawer() {
		if (this.props.drawerStatus) {
			this.props.valChange(false, 'drawerStatus')
		}
	}

	addAction() {
		const that = this
		const userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
		const actionID = $storage.session.get('action_id')
		const eventID = $storage.local.get('event_id')
		const actionValue = that.refs.actionValue.value
		const actionNumber = that.refs.actionNumber.value

		if (!actionValue) {
			toast('请补全重量哟！')
			return
		} else if (!actionNumber) {
			toast('次数未补全哟！')
			return
		}

		this.props.valChange(false, 'drawerStatus')
		function categoryLink() {
			that.props.directTo(`/member/course/${userID}`)
		}
		function filter(addActionResult) {
			if (addActionResult.code >= 200 && addActionResult.code <= 300) {
				setTimeout(categoryLink, 10)
			}
			return addActionResult
		}
		this.props.fetchList(
			'/fitness/exercise_record/',
			{
				method: 'POST',
				params: {
					user_id: userID,
					exercise_id: actionID,
					event_id: eventID,
					value: actionValue,
					number: actionNumber
				}
			},
			'addActionResult',
			filter
		)
	}

	render() {
		const props = this.props
		const categoryChildInfo = props.categoryChildInfo || []
		const categoryInfo = props.categoryInfo || []
		const currenAction = props.currenAction || {}
		const actionRootEle = (
			<List>
				{
					categoryInfo.map((item, index) => (
						<ListItem
							key={index}
							value={index}
							primaryText={item.name}
							leftAvatar={<Avatar src={item.icon} />}
							onClick={this.hanleChangeRoot.bind(this, item.id)}
							className="action-root-item"
						/>
					))
				}
			</List>
		)

		const actionSubEle = (
			<ul>
				{
					categoryChildInfo.map((item, index) => (
						<li key={index} onClick={this.hanleChangeAction.bind(this, item)}>
							<img src={item.icon_url} alt="icon" />
							<p>{item.name}</p>
							<span>+</span>
						</li>
					))
				}
			</ul>
		)

		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''

		return (
			<div className="container action-wrap">
				<div className="action-root-bar" onClick={this.toggleDrawer}>
					{actionRootEle}
				</div>
				<div className="action-sub-wrap">
					{actionSubEle}
				</div>
				<Drawer openSecondary={true}
					open={props.drawerStatus}
					containerClassName="drawer-wrap"
				>
					<div className="drawer-container">
						<img src={currenAction.icon_url} width={30} alt="icon" />
						<p>{currenAction.name}</p>
						<div className="drawer-container-input">
							<span>重量</span>
							<input type="number" placeholder="重量" ref="actionValue" />
							<span>KG</span>
						</div>
						<div className="drawer-container-input">
							<span>次数</span>
							<input type="number" placeholder="次数" ref="actionNumber" />
							<span>次</span>
						</div>
						<RaisedButton
							label="添加动作"
							onTouchTap={this.addAction}
							backgroundColor="#2b3297"
							labelColor="#fff"
							className="addaction-btn"
						/>
					</div>
				</Drawer>
				{popupEle}
			</div>
		)
	}
}

export default AddActionEle
