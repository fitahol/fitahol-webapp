const map = {
	local: {
		title: '试玩团',
		theme: 'shiwantuan',
		api: 'http://91atm.aa123bb.com'
	},
	'91atm': {
		title: '试玩团',
		theme: 'shiwantuan'
	},
	api: {
		title: '试玩团',
		theme: 'shiwantuan'
	},
	api2: {
		title: '试玩二团',
		theme: 'shiwantuan'
	},
	www: {
		title: '试玩二团',
		theme: 'shiwantuan'
	}
}


const host = location.port ? 'local' : location.host.split('.')[0]
const config = map[host]
export default {
	TITLE: config.title,
	THEME: config.theme,
	API: config.api || location.origin,
	SCHEMA: config.schema,
	PORT: config.port,
	KEY: config.key,
	DEBUG: config.debug
}
