const gulp = require('gulp')
const jade = require('gulp-jade')
// const sass = require('gulp-sass')
const watch = require('gulp-watch')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const clean = require('gulp-clean')
const minifyCss = require('gulp-cssnano')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
// const webpack = require('gulp-webpack')

// const webpackConfig = require('./webpack.config.babel.js')

// gulp.task('scripts', () => {
// 	gulp.src('./src/scripts/index.js')
// 		.pipe(webpack(webpackConfig))
// 		.pipe(gulp.dest('./dist'))
// })

gulp.task('scss', () => {
	gulp.src(['./src/public/style/main.scss', './src/components/**/*.scss'])
		.pipe(concat('min.css'))
		// .pipe(sass().on('error', sass.logError))
		.pipe(postcss([
			autoprefixer({
				browsers: ['last 2 versions', 'last 10 iOS versions'],
				add: true,
				remove: true
			})
		]))
		.pipe(minifyCss({ zindex: false }))
		.pipe(gulp.dest('dist/style/'))
})

gulp.task('html', () => {
	gulp.src('./src/views/*.jade')
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('./dist/views/'))
})

gulp.task('image', () => {
	gulp.src('./dist/img/*', { read: false })
		.pipe(clean())
	gulp.src('./src/public/img/**')
		.pipe(watch('./src/public/img/**'))
		.pipe(
			imagemin({
				optimizationLevel: 5,
				progressive: true
			})
		)
		.pipe(gulp.dest('dist/img/'))
})

gulp.task('scss:watch', () => {
	watch('./src/**/*.scss', () => {
		gulp.start('scss')
	})
})

gulp.task('html:watch', () => {
	watch('./src/**/*.jade', () => {
		gulp.start('html')
	})
})

gulp.task('image:watch', () => {
	watch('./src/public/img/**', () => {
		gulp.start('image')
	})
})

gulp.task('scripts:watch', () => {
	watch('./src/**/*.+(js|scss)', () => {
		gulp.start('scripts')
	})
})

gulp.task('default', ['html', 'scss', 'image', 'html:watch', 'scss:watch', 'image:watch'])
