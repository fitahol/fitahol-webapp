import React, { PropTypes } from 'react'
import { toDou } from '../../../services/util'
import HourItemEle from './hourItem'

class HourEle extends React.Component {
	static propTypes = {
		hasClickItem: PropTypes.bool.isRequired,
		hasClickItemInfo: PropTypes.object.isRequired,
		valChange: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		weekTitleInfo: PropTypes.array.isRequired,
		dateTitleInfo: PropTypes.array.isRequired,
		fitaholData: PropTypes.array.isRequired
	}
	constructor(props) {
		super(props)
		const hourTitleArr = []
		for (let i = 0; i < 24; i++) {
			hourTitleArr.push(toDou(i))
		}
		this.hourTitleInfo = hourTitleArr
	}

	render() {
		const props = this.props
		return (
			<div className="hour-picker">
			{
				this.hourTitleInfo.map((item, index) => (
					<div key={index} className="hour-list">
						<HourItemEle
							hourItemTitle={item}
							valChange={props.valChange}
							directTo={props.directTo}
							hasClickItem={props.hasClickItem}
							hasClickItemInfo={props.hasClickItemInfo}
							weekTitleInfo={props.weekTitleInfo}
							dateTitleInfo={props.dateTitleInfo}
							fitaholData={props.fitaholData}
						/>
					</div>
				))
			}
			</div>
		)
	}
}

export default HourEle
