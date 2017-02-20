import React, { PropTypes } from 'react'
import { CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import { List, ListItem } from 'material-ui/List'
import Lock from 'material-ui/svg-icons/action/lock'
import FormsySelect from 'formsy-material-ui/lib/FormsySelect'
import MenuItem from 'material-ui/MenuItem'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import PlaceFitnessCenter from 'material-ui/svg-icons/places/fitness-center'

import Popup from '../../../components/popup'
import './style.scss'

import { Form } from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'

import $storage from '../../../services/storage'

class LoginView extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		directTo: PropTypes.func.isRequired,
		submitInfo: PropTypes.object.isRequired,
		canSubmit: PropTypes.bool.isRequired,
		UType: PropTypes.number.isRequired,
		valChange: PropTypes.func.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		modalState: PropTypes.bool.isRequired
	}

	constructor(props) {
		super(props)
		this.enableButton = this.enableButton.bind(this)
		this.disableButton = this.disableButton.bind(this)
		this.submitForm = this.submitForm.bind(this)
		this.UTypeChange = this.UTypeChange.bind(this)
	}

	componentWillMount() {
		localStorage.clear()
	}

	componentWillReceiveProps(nextProps) {
		const that = this
		const nextSubmit = nextProps.submitInfo
		function loginDirect(uType, id) {
			const selfID = id || $storage.local.get('self')
			if (uType === '1') {
				that.props.directTo('/')
			} else {
				that.props.directTo(`/member/health/${selfID}`)
			}
		}
		if (this.props.submitInfo.id !== nextSubmit.id) {
			$storage.local.set('self', nextSubmit.id)
			$storage.local.set('token', nextSubmit.token)
			$storage.local.set('uType', nextSubmit.u_type)
			// u_type =1 教练  u_type =0 学员
			setTimeout(loginDirect(nextSubmit.u_type, nextSubmit.id), 500)
		}
	}

	enableButton() {
		this.props.valChange(true, 'canSubmit')
	}

	disableButton() {
		this.props.valChange(false, 'canSubmit')
	}

	UTypeChange(Utype) {
		this.props.valChange(Utype, 'Utype')
	}

	submitForm(data) {
		const { phone, password, u_type } = data
		const account = phone
		const queryData = {
			method: 'POST',
			params: {
				account,
				password,
				u_type
			}
		}
		this.props.fetchList(
			'/account/login/',
			queryData,
			'submitInfo'
		)
	}

	render() {
		const errorMessages = {
			phoneError: '请输入正确的手机号码',
			pwdError: '密码在6到16位之间'
		}

		let { phoneError, pwdError } = errorMessages

		return (
			<div className="container">
				<Form
					onValid={this.enableButton}
					onInvalid={this.disableButton}
					onValidSubmit={this.submitForm}
				>
					<List>
						<ListItem
							primaryText={
								<FormsyText
									name="phone"
									validations="isNumeric,isLength:11"
									validationError={phoneError}
									required
									hintText="请输入手机号"
									fullWidth={true}
									floatingLabelText="手机号"
								/>}
							leftIcon={<AccountCircle className="login-icon-fix" />}
							className="formsy-item"
						/>
						<ListItem
							primaryText={
								<FormsyText
									name="password"
									type="password"
									validations="minLength:6,maxLength:16"
									validationError={pwdError}
									required
									hintText="请输入密码"
									fullWidth={true}
									floatingLabelText="密码"
								/>}
							secondaryText={<p className="iForget">
								<Link to="/iforget">忘记密码？</Link></p>}
							leftIcon={<Lock className="login-icon-fix" />}
							className="formsy-item"
						/>
						<ListItem
							primaryText={
								<FormsySelect
									name="u_type"
									required
									floatingLabelText="选择身份"
									value={this.props.UType}
									onChange={this.UTypeChange}
									fullWidth={true}
								>
									<MenuItem value={1} primaryText="教练" />
									<MenuItem value={0} primaryText="学员" />
								</FormsySelect>
							}
							leftIcon={<PlaceFitnessCenter className="login-icon-fix" />}
							className="formsy-item"
						/>
					</List>
					<CardActions className="fixCenter login-btn" >
						<RaisedButton
							type="submit"
							label="登录"
							style={{ height: 45 }}
							backgroundColor="#2f3e9e"
							fullWidth={true}
							disabled={!this.props.canSubmit}
						/>
					</CardActions>
					{/*
						<div className="fixCenter" >
						<img className="fixWechat"
							src="https://cdn3.iconfinder.com/data/icons/social-media-chat-1/512/WeChat-128.png"
							alt="Wechat"
						/>
						<p>微信登录</p>
					</div>*/
					}
				</Form>
				<Popup
					modal={this.props.modal}
					modalClose={this.props.modalClose}
					directTo={this.props.directTo}
					modalState={this.props.modalState}
				/>
				<List className="toRegister">
					<ListItem>
						<p>还没帐户？ 快去注册吧！</p>
						<br />
						<RaisedButton
							type="text"
							label="注册"
							style={{ height: 45 }}
							secondary={true}
							fullWidth={true}
							containerElement={<Link to="/register" />}
						/>
					</ListItem>
				</List>
			</div>
	)
	}
}

export default LoginView
