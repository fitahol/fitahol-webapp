const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	debug: true,
	entry: {
		main: ['whatwg-fetch', './src/main']
	},
	output: {
		path: path.join(__dirname, 'dist/'),
		// filename: 'script/[name].[chunkhash:8].js',
		filename: 'script/[name].js?v=[chunkhash:8]',
		publicPath: '/'
	},
	resolve: {
		root: './src',
		extensions: ['', '.js', '.jsx']
	},
	eslint: {
		configFile: './.eslintrc',
		failOnWarning: false,
		failOnError: false
	},
	node: {
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	},
	module: {
		exprContextRegExp: /$^/,
		exprContextCritical: false,
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['babel']
		},
		{
			test: /\.json$/,
			loader: 'json'
		},
		{
			test: /\.scss$/,
			loaders: ExtractTextPlugin.extract({
				fallbackLoader: 'style-loader',
				loader: 'css-loader!postcss-loader!sass-loader'
			})
		}]
	},
	postcss: [autoprefixer({ browsers: ['last 2 versions', 'last 10 iOS versions'] })],
	plugins: [
		new webpack.IgnorePlugin(/\/iconv-loader$/),
		new webpack.ProvidePlugin({
			react: 'react',
			'react-dom': 'react-dom',
			classnames: 'classnames',
			redux: 'redux',
			'react-redux': 'react-redux',
			'react-router': 'react-router',
			'react-router-redux': 'react-router-redux',
			'whatwg-fetch': 'whatwg-fetch',
			'redux-saga': 'redux-saga',
			// 'react-swipe': 'react-swipe',
			// 'redux-logger': 'redux-logger',
			// immutable: 'immutable',
			Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new ExtractTextPlugin({ filename: 'style/min.css', disable: true, allChunks: false }),
		new HtmlWebpackPlugin({
			template: './src/views/index.html',
			filename: './views/index.html',
			chunks: 'main',
			inject: 'body'
		})
	]
}

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins = module.exports.plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: false
			},
			mangle: {
				except: ['$super', '$', 'exports', 'require']
			}
		})
	])
}
