const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.babel')

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	path: config.output.path,
	hot: true,
	historyApiFallback: true
}).listen(3001, 'localhost', (err, result) => {
	let resultData
	if (err) {
		resultData = err
	} else {
		resultData = result
	}
	return resultData
})
