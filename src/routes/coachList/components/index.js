import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { AddIcon } from '../../../public/materialUi'

class CoachListEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		coachListData: PropTypes.array.isRequired
	}

	static defaultProps = {
		coachListData: []
	}

	componentWillMount() {
		function dataFilter(data) {
			const letterData = []
			for (const each of data) {
				if (letterData.indexOf(each.first_letter) !== -1) {
					each.first_letter = ''
				} else {
					letterData.push(each.first_letter)
				}
			}
			return data
		}

		this.props.fetchList(
			'/account/coach/personal/',
			{ querys: {
				time: Date.now()
			} },
			'coachListData',
			dataFilter
		)
	}

	componentDidMount() {
		document.body.style.backgroundColor = '#edf0f5'
	}
	render() {
		const coachListData = this.props.coachListData
		let coachListEle
		if (coachListData.length) {
			coachListEle = (
				coachListData.map((item, index) => {
					const tagsEle = item.expert_tags ?
					item.expert_tags.map((tagsItem, tagsIndex) => (
						<p key={tagsIndex}>
							擅长动作：{tagsItem.name}
							<span>动作简介：{tagsItem.desc}</span>
						</p>
					)) : ''
					const itemUser = item.user
					return (
						<div className="coach-list-item" key={index}>
							<div className="coach-list-avator">
								<img src={itemUser.portrait} alt="" />
								<p>{itemUser.id}</p>
								<p>昵称：{itemUser.nickname}</p>
							</div>
							<div className="coach-list-tags">
								{tagsEle}
							</div>
						</div>
					)
				}

				)
			)
		} else {
			coachListEle = (
				<div className="no-record">您还没有添加任何教练</div>
			)
		}
		return (
			<div className="container">
				<Link to="/add-member" className="enter-add-coach">
					<span><AddIcon />添加教练</span>
				</Link>
				{coachListEle}
			</div>
		)
	}
}

export default CoachListEle
