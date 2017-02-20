import React from 'react'
import LoginView from './login'

class LoginElt extends React.Component {
	render() {
		return (
			<LoginView
				{...this.props}
			/>
		)
	}
}

export default LoginElt
