import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class Popup extends React.Component {
	static propTypes = {
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalClose: PropTypes.func.isRequired,
		directTo: PropTypes.func
	}

	static defaultProps = {
		modal: {
			content: '',
			cancel: '',
			cancelCallback: () => {},
			confirm: '',
			confirmCallback: () => {}
		}
	}

	constructor(props) {
		super(props)
		this.confirm = this.confirm.bind(this)
		this.cancel = this.cancel.bind(this)
	}

	confirm(e) {
		e.preventDefault()
		e.stopPropagation()
		const modal = this.props.modal
		if (modal.confirmCallback) modal.confirmCallback()
		this.props.modalClose()
	}
	cancel(e) {
		e.preventDefault()
		e.stopPropagation()
		const modal = this.props.modal
		if (modal.cancelCallback) modal.cancelCallback()
		this.props.modalClose()
	}

	render() {
		const props = this.props
		let actions
		if (props.cancel && props.confirm) {
			actions = [
				<FlatButton
					label={props.cancel}
					primary={true}
					onTouchTap={this.cancel}
				/>,
				<FlatButton
					label={props.confirm}
					primary={true}
					onTouchTap={this.confirm}
				/>
			]
		} else {
			actions = [
				<FlatButton
					label={props.confirm || '确认'}
					primary={true}
					onTouchTap={this.confirm}
				/>
			]
		}

		return (
			<Dialog
				modal={false}
				actions={actions}
				open={props.modalState}
				onRequestClose={props.modalClose}
			>
				{props.modal.content}
			</Dialog>
		)
	}
}


export default Popup
