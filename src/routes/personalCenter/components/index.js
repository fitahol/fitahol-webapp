import React, { PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'
import { RadioButton, RadioButtonGroup,
	ActionFavorite, ActionFavoriteBorder } from '../../../public/materialUi'
import Portrait from './portrait'
export default class PersonalCenterEle extends React.Component {
	static propTypes = {
		valChange: PropTypes.func.isRequired,
		fetchList: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		userInfo: PropTypes.object.isRequired,
		gender: PropTypes.number.isRequired,
		choosePortraitInfo: PropTypes.string.isRequired,
		editorStatus: PropTypes.bool.isRequired
	}

	static defaultProps = {
		userInfo: {}
	}

	constructor(props) {
		super(props)
		this.getUseInfo = this.getUseInfo.bind(this)
		this.changeEditor = this.changeEditor.bind(this)
		this.confirmEditor = this.confirmEditor.bind(this)
		this.canelEditor = this.canelEditor.bind(this)
	}

	componentWillMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
		this.getUseInfo()
	}

	getUseInfo() {
		const self = $storage.local.get('self') || $storage.local.get('user_id') || 0
		this.props.fetchList(
			`/account/profile/${self}/`,
			undefined,
			'userInfo'
		)
	}

	changeEditor(e,value) {
		let gender
		if (value !== undefined) {
			gender = +value
			this.props.valChange(gender, 'gender')
		}
		this.props.valChange(true, 'editorStatus')
	}

	canelEditor() {
		this.props.valChange(false, 'editorStatus')
		this.getUseInfo()
	}

	confirmEditor() {
		const that = this
		const props = this.props
		const self = $storage.local.get('self') || $storage.local.get('user_id') || 0
		const nickname = this.refs.nickname.value
		const intro = this.refs.intro.value
		function filter(data) {
			if (data.code >= 200 && data.code < 300) {
				setTimeout(that.canelEditor, 10)
			}
		}
		this.props.fetchList(
			`/account/profile/${self}/`,
			{
				method: 'PATCH',
				params: {
					nickname,
					intro,
					gender: props.gender
				}
			},
			undefined,
			filter
		)
	}
	render() {
		const props = this.props
		const userInfo = props.userInfo || {}
		const sexStyle = {
			width: '7rem',
			flex: 1
		}
		const sexEle = (
			<RadioButtonGroup
				name="shipSpeed"
				defaultSelected={(props.gender + 1).toFixed(0)}
				ref="sex"
				className="list-item-right choose-sex"
				onChange={this.changeEditor}
			>
				<RadioButton
					value="0"
					checkedIcon={<ActionFavorite />}
					uncheckedIcon={<ActionFavoriteBorder />}
					label="男"
					style={sexStyle}
				/>
				<RadioButton
					checkedIcon={<ActionFavorite />}
					value="1"
					uncheckedIcon={<ActionFavoriteBorder />}
					label="女"
					style={sexStyle}
				/>
			</RadioButtonGroup>
		)

		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''

		const editorConfirmEle = props.editorStatus ?
			<div className="confirm-editor">
				<a className="cancel-btn" onClick={this.canelEditor}>取消编辑</a>
				<a className="confirm-btn" onClick={this.confirmEditor}>保存</a>
			</div> : ''

		return (
			<div className="container personal-center-wrap">
				<Portrait
					userInfo={userInfo}
					choosePortraitInfo={props.choosePortraitInfo}
					largePortraitShow={props.largePortraitShow}
					modalOpen={props.modalOpen}
					directTo={props.directTo}
					fetchList={props.fetchList}
					valChange={props.valChange}
					getUseInfo={this.getUseInfo}
				/>
				<div className="panel"></div>
				{editorConfirmEle}
				<div className="list-item">
					<span>昵称</span>
					<input
						type="text"
						className="list-item-right"
						placeholder={userInfo.nickname || '昵称'}
						ref="nickname"
						onChange={this.changeEditor}
					/>
				</div>
				<div className="list-item no-border">
					<span>账号</span>
					<p className="list-item-right">{userInfo.nickname}</p>
				</div>
				<div className="panel"></div>
				<div className="list-item">
					<span>性别</span>
					{sexEle}
				</div>
				<div className="list-item personal-center-item">
					<span>个性签名</span>
					<input
						type="text"
						placeholder={userInfo.ontro || '个性签名'}
						className="list-item-right"
						ref="intro"
						onChange={this.changeEditor}
					/>
				</div>
				{popupEle}
			</div>
		)
	}
}
