import React, { PropTypes } from 'react'
import { CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import { Form } from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'
import Lock from 'material-ui/svg-icons/action/lock'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import FingerPrint from 'material-ui/svg-icons/action/fingerprint'

import Popup from '../../../components/popup'
import './iforget.scss'

class RegisterView extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		modalState: PropTypes.bool.isRequired,
		modal: PropTypes.object.isRequired,
		directTo: PropTypes.func.isRequired,
		isLoading: PropTypes.bool.isRequired,
		submitInfo: PropTypes.object.isRequired,
		codeInfo: PropTypes.object.isRequired,
		canSubmit: PropTypes.bool.isRequired,
		disableCodeSend: PropTypes.bool.isRequired
	}

	static defaultProps = {
		codeInfo: {
			code: 0,
			isCounting: false,
			delay: 59
		}
	}

	constructor(props) {
		super(props)
		this.enableButton = this.enableButton.bind(this)
		this.resetCodeInfo = this.resetCodeInfo.bind(this)
		this.disableButton = this.disableButton.bind(this)
		this.submitForm = this.submitForm.bind(this)
		this.handlePhoneChange = this.handlePhoneChange.bind(this)
		this.sendCode = this.sendCode.bind(this)
		this.countDown = this.countDown.bind(this)
		this.phone = ''
	}

	componentDidMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
	}

	componentWillReceiveProps(nextProps) {
		const that = this
		const props = that.props
		const nextSubmit = nextProps.submitInfo
		const nextCode = nextProps.codeInfo
		const propsCode = props.codeInfo
		if (nextSubmit.code >= 200 && nextSubmit.code < 300) {
			setTimeout(() => {
				that.props.directTo('/login')
			}, 2000)
		}

		// is counting
		if (nextCode.isCounting) {
			if (propsCode.delay !== nextCode.delay) {
				clearTimeout(that.timer)
				if (nextCode.delay > 0) {
					that.timer = setTimeout(that.countDown, 1000)
				} else if (nextCode.delay <= 0) { // 倒计时完成
					setTimeout(that.resetCodeInfo, 1000)
					that.timer = null
				}
			}
		}

		// 验证码发送成功
		if (nextCode.code === 200 && nextCode.isCounting === true && nextCode.delay === 59) {
			setTimeout(that.countDown, 1000)
			props.valChange(true, 'disableCodeSend')
			return
		}
	}

	enableButton() {
		this.props.valChange(true, 'canSubmit')
	}

	disableButton() {
		this.props.valChange(false, 'canSubmit')
	}

	countDown() {
		this.props.valChange({
			code: 200,
			isCounting: true,
			delay: this.props.codeInfo.delay - 1
		}, 'codeInfo')
	}

	resetCodeInfo() {
		this.props.valChange({
			code: 0,
			isCounting: false,
			delay: 59
		}, 'codeInfo')
	}

	handlePhoneChange(event) {
		const phone = event.target.value
		this.props.valChange(phone, 'phone')
		this.phone = phone
		// if (telR.test(phone)) {
		// 	this.props.valChange(phone, 'phone')
			// if (!that.props.codeInfo.hasSent) {
			// 	that.sendCode(phone)
			// }
		// }
	}

	sendCode() {
		const that = this
		const props = this.props
		const account = this.phone
		const telR = /^1[3|4|5|7|8][0-9]\d{8}$/

		if (props.isLoading) return
		if (!telR.test(account)) {
			return
		}
		if (props.codeInfo.isCounting && props.codeInfo.delay < 59) {
			return
		}

		function codeFilter(data) {
			that.hasSent = true
			let result = {
				code: 0,
				isCounting: false,
				delay: 59
			}
			if (data.code === 200) {
				result = {
					code: 200,
					isCounting: true,
					delay: 59
				}
			}
			return result
		}
		// 发送验证码
		props.fetchList(
			'/firmware/valid_code/',
			{ querys: { account, v_type: 'reset_pwd' } },
			'codeInfo',
			codeFilter
		)
	}

	submitForm(data) {
		const { phone, valid_code, password } = data
		const account = phone
		const queryData = {
			method: 'POST',
			params: {
				account,
				password,
				valid_code
			}
		}
		this.props.fetchList(
			// '/account/bind/phone/',
			'/account/reset_pwd/',
			queryData,
			'submitInfo'
		)
	}
	render() {
		const props = this.props
		const propsCodeInfo = props.codeInfo
		const errorMessages = {
			phoneError: '请输入正确的手机号码',
			vcodeError: '请输入正确的验证码',
			pwdError: '密码在6到16位之间'
		}

		let { phoneError, vcodeError, pwdError } = errorMessages

		let sendBtnTitle
		if (propsCodeInfo.isCounting && this.hasSent && propsCodeInfo.code === 200) {
			sendBtnTitle = `重新获取(${propsCodeInfo.delay || ''})`
		} else {
			sendBtnTitle = '获取验证码'
		}

		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''

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
									onChange={this.handlePhoneChange}
								/>}
							leftIcon={<AccountCircle className="register-icon-fix " />}
						/>
						<ListItem
							primaryText={
								<FormsyText
									name="valid_code"
									validations="isNumeric,isLength:4"
									validationError={vcodeError}
									required
									hintText="请输入验证码"
								/>}
							leftIcon={<FingerPrint className="register-icon-fix " />}
							rightIconButton={
								<RaisedButton
									label={sendBtnTitle}
									disabled={this.props.disableCodeSend}
									onClick={this.sendCode}
									style={{ top: '18px' }}
								/>}
						/>
						<ListItem
							primaryText={
								<FormsyText
									name="password"
									type="password"
									validations="minLength:6,maxLength:16"
									validationError={pwdError}
									required
									hintText="请输入新密码"
									fullWidth={true}
								/>}
							leftIcon={<Lock className="register-icon-fix " />}
						/>
					</List>
					<CardActions className="fixCenter" >
						<RaisedButton
							label="修改密码"
							type="submit"
							style={{height: 50}}
							disabled={!this.props.canSubmit}
							secondary={true}
							fullWidth={true}
						/>
					</CardActions>
				</Form>
				{popupEle}
			</div>
		)
	}
}

export default RegisterView
