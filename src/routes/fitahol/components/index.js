import React, { Component, PropTypes } from 'react'
import Popup from '../../../components/popup'
import $storage from '../../../services/storage'
import '../fitahol.scss'
import WeekClendar from './weekPicker'

class fitaholEle extends Component {
	static propTypes = {
		modal: PropTypes.object.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		modalState: PropTypes.bool.isRequired,
		fetchList: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		currentDateInfo: PropTypes.string.isRequired,
		weekTitleInfo: PropTypes.array.isRequired,
		dateTitleInfo: PropTypes.array.isRequired,
		actualWeekMoment: PropTypes.object.isRequired,
		hasClickItem: PropTypes.bool.isRequired,
		hasClickItemInfo: PropTypes.object.isRequired,
		swipeIndex: PropTypes.number.isRequired,
		fitaholData: PropTypes.array.isRequired,
		hasScroll: PropTypes.bool.isRequired,
		currentMonthTheme: PropTypes.number.isRequired
	}

	static defaultPropTypes = {
		fitaholData: [],
		currentMonthTheme: 0
	}

	constructor(props) {
		super(props)
		const width = document.body.offsetWidth
		this.fontSize = width / 320 * 12
	}
	// static contextTypes = {
	// 	router: PropTypes.object.isRequired
	// }

	componentDidMount() {
		const uType = $storage.local.get('uType')
		const selfID = $storage.local.get('self')
		if (uType == null) {
			localStorage.clear()
		}
		if (uType === '0') {
			// 学员跳转
			this.props.directTo(`/member/health/${selfID}`)
		}
	}

	componentWillReceiveProps(nextProps) {
		const props = this.props
		if (!this.props.hasScroll && nextProps.fitaholData.code === 200) {
			this.props.valChange(true, 'hasScroll')
		}
		const currentMonth = props.weekTitleInfo.length && props.weekTitleInfo[5].month
		const nextMonth = nextProps.weekTitleInfo[5].month
		if (props.weekTitleInfo.length && currentMonth !== nextMonth) {
			props.valChange(+currentMonth, 'currentMonthTheme')
		}
	}

	render() {
		const props = this.props
		if (!props.hasScroll)	{
			window.scrollTo(0, this.fontSize * 32)
		}
		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''
		const currentMonthThemeClass = `container theme${props.currentMonthTheme % 3 + 1}`
		return (
			<div className={currentMonthThemeClass}>
				<div className="header"></div>
				<WeekClendar
					currentDateInfo={props.currentDateInfo}
					modalOpen={props.modalOpen}
					fetchList={props.fetchList}
					valChange={props.valChange}
					directTo={props.directTo}
					weekTitleInfo={props.weekTitleInfo}
					dateTitleInfo={props.dateTitleInfo}
					actualWeekMoment={props.actualWeekMoment}
					hasClickItem={props.hasClickItem}
					hasClickItemInfo={props.hasClickItemInfo}
					swipeIndex={props.swipeIndex}
					fitaholData={props.fitaholData}
					hasScroll={props.hasScroll}
				/>
				{popupEle}
			</div>
		)
	}
}

export default fitaholEle
