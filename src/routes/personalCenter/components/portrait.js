import React, { PropTypes } from 'react'
import $storage from '../../../services/storage'
export default class portraitEle extends React.Component {
	static propTypes = {
		valChange: PropTypes.func.isRequired,
		fetchList: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		modalOpen: PropTypes.func.isRequired,
		getUseInfo: PropTypes.func.isRequired,
		userInfo: PropTypes.object.isRequired,
		choosePortraitInfo: PropTypes.string.isRequired,
		largePortraitShow: PropTypes.bool.isRequired
	}

	static defaultProps = {
		userInfo: {}
	}
	constructor(props) {
		super(props)
		this.toggelPortrait = this.toggelPortrait.bind(this)
		this.changePortrait = this.changePortrait.bind(this)
		this.confirmChangePortrait = this.confirmChangePortrait.bind(this)
		this.cancelChangePortrait = this.cancelChangePortrait.bind(this)
		this.drawCanvasImage = this.drawCanvasImage.bind(this)
	}

	toggelPortrait(e) {
		e.preventDefault()
		e.stopPropagation()
		const props = this.props
		props.valChange(!props.largePortraitShow, 'largePortraitShow')
	}

	confirmChangePortrait() {
		const props = this.props
		function filter(data) {
			if (data.code === 200) {
				setTimeout(props.getUseInfo, 10)
				// location.reload()
			}
		}
		const self = $storage.local.get('self') || $storage.local.get('user_id') || 0
		props.valChange(false, 'largePortraitShow')
		props.fetchList(
			`/account/profile/${self}/`,
			{
				method: 'PATCH',
				params: {
					nickname: props.userInfo.nickname,
					portrait: props.choosePortraitInfo
				}
			},
			'undefined',
			filter
		)
	}

	cancelChangePortrait() {
		const props = this.props
		props.valChange(false, 'largePortraitShow')
		props.valChange('', 'choosePortraitInfo')
	}

	changePortrait(event) {
		this.readImage(event.target.files[0])
	}

	loadImage(src, onload) {
		const img = new Image()
		img.src = src
		img.onload = () => {
			onload(img)
		}
		img.onerror = () => {
			onload(false)
		}
	}

	readImage(src) {
		const that = this
		// 创建 FileReader 对象 并调用 render 函数来完成渲染
		// src.type
		const reader = new FileReader()
		reader.onload = function(e) {
			// that.drawImage(e.target.result)
			that.loadImage(e.target.result, that.drawCanvasImage)
		}
		// 读取文件内容
		reader.readAsDataURL(src)
	}

	drawCanvasImage(image) {
		const props = this.props
		// 绘制图片
		let width = image.width
		let height = image.height
		// 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
		let ratio = width * height / 1000000
		if (ratio > 1) {
			ratio = Math.sqrt(ratio)
			width /= ratio
			height /= ratio
		} else {
			ratio = 1
		}

		function onloadCanvas() {
			// 用于压缩图片的canvas
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			// 瓦片canvas
			const tCanvas = document.createElement('canvas')
			const tctx = tCanvas.getContext('2d')
			// canvas 清屏
			ctx.fillStyle = '#fff'
			ctx.clearRect(0, 0, canvas.width, canvas.height)
				// 重置canvas宽高
			canvas.width = width
			canvas.height = height
			// 绘制
			// 如果图片像素大于100万则使用瓦片绘制
			let count = width * height / 1000000
			if (count > 1) {
				// 计算要分成多少块瓦片
				count = ~~(Math.sqrt(count) + 1)
				// 计算每块瓦片的宽和高
				const nw = ~~(width / count)
				const nh = ~~(height / count)

				tCanvas.width = nw
				tCanvas.height = nh

				for (let i = 0; i < count; i++) {
					for (let j = 0; j < count; j++) {
						tctx.drawImage(image, i * nw * ratio, j * nh * ratio,
							nw * ratio, nh * ratio, 0, 0, nw, nh)

						ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
					}
				}
			} else {
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
			}
			const imgSrcData = canvas.toDataURL('image/jpg', 0.1)
			// tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
			props.valChange(imgSrcData, 'choosePortraitInfo')
			props.valChange(true, 'largePortraitShow')
		}
		onloadCanvas()
	}

	render() {
		const props = this.props
		const userInfo = this.props.userInfo || {}
		let largePortraitEle
		if (props.largePortraitShow) {
			if (props.choosePortraitInfo) {
				largePortraitEle = (
					<div className="large-portrait-wrap">
						<div className="large-portrait">
							<img src={props.choosePortraitInfo} alt="" onClick={this.toggelPortrait} />
						</div>
						<a className="cancel-btn" onClick={this.cancelChangePortrait}>取消</a>
						<a className="confirm-btn" onClick={this.confirmChangePortrait}>确认使用</a>
					</div>
				)
			} else {
				largePortraitEle = (
					<div className="large-portrait-wrap">
						<div className="large-portrait">
							<img src={userInfo.portrait} alt="" onClick={this.toggelPortrait} />
						</div>
					</div>
				)
			}
		}
		return (
			<div className="list-item personal-center-item no-border">
				<input
					type="file"
					accept="image/png,image/jpeg,image/gif"
					name="file"
					onChange={this.changePortrait}
					className="file-input"
				/>
				<img src={userInfo.portrait} alt="" onClick={this.toggelPortrait} className="small-portrait" />
				{largePortraitEle}
			</div>
		)
	}
}
