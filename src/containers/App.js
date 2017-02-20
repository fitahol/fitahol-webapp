import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import { blue700 } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
	fontFamily: 'PingFang-SC-Regular',
	palette: {
		primary1Color: '#f7604f',
		color: '#2f3e9e'
	},
	appBar: {
		color: '#2f3e9e',
		height: 50
	},
	datePicker: {
		selectColor: '#2f3e9e'
	}
})

class AppContainer extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		routes: PropTypes.object.isRequired,
		routerKey: PropTypes.number,
		store: PropTypes.object.isRequired
	}
	render() {
		const { history, routes, routerKey, store } = this.props
		let pageChange
		if (location.pathname !== '/') {
			pageChange = () => window.scrollTo(0, 0)
		}
		return (
			<Provider store={store}>
				<MuiThemeProvider muiTheme={muiTheme}>
					<div style={{ height: '100%' }}>
						<Router
							history={history}
							children={routes}
							key={routerKey}
							onUpdate={pageChange}
						/>
					</div>
				</MuiThemeProvider>

			</Provider>
		)
	}
}

export default AppContainer
