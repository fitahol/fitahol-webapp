import React, { PropTypes } from 'react'
import SelectModelEle from '../../../components/selectModel'
import Popup from '../../../components/popup'
import { toast } from '../../../services/util'

class ContactEle extends React.Component {
	static propTypes = {
		valChange: PropTypes.func.isRequired,
		fetchList: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		addMemberInfo: PropTypes.object.isRequired,
		selectData: PropTypes.array.isRequired,
		queryID: PropTypes.string.isRequired,
		queryResultData: PropTypes.array.isRequired
	}

	static defaultProps = {
		addMemberInfo: {},
		selectData: []
	}

	constructor(props) {
		super(props)
		this.getAddMemberInfo = this.getAddMemberInfo.bind(this)
		this.handleChangeQuery = this.handleChangeQuery.bind(this)
		this.confirmQueryAdd = this.confirmQueryAdd.bind(this)
		this.cancelQueryAdd = this.cancelQueryAdd.bind(this)
		this.handleChangeQuest = this.handleChangeQuest.bind(this)
	}

	componentWillMount() {
		if (this.props.modalState) {
			this.props.modalClose()
		}
		this.getAddMemberInfo()
	}

	getAddMemberInfo() {
		this.props.fetchList(
			'/account/relation/',
			undefined,
			'addMemberInfo'
		)
	}

	componentWillUnMount() {
		this.cancelQueryAdd()
	}

	handleChangeQuest(id, value) {
		const that = this
		function filter(data) {
			if (data.code === 200) {
				setTimeout(that.getAddMemberInfo, 10)
			}
		}
		if (id) {
			this.props.fetchList(
				`/account/relation/${id}/`,
				{
					method: 'POST',
					params: {
						status: value,
						time: Date.now()
					}
				},
				undefined,
				filter
			)
		}
	}

	handleChangeQuery(name) {
		const props = this.props
		function filter(queryResultData) {
			if (!queryResultData.length) {
				toast('该用户不存在哟！')
			}
			return queryResultData
		}
		props.fetchList(
			`/account/profile/?query=${name || props.queryID}`,
			{
				querys: {
					time: Date.now()
				}
			},
			'queryResultData',
			filter
		)
	}

	cancelQueryAdd() {
		this.props.valChange([], 'queryResultData')
	}

	confirmQueryAdd() {
		const props = this.props
		if (props.queryResultData[0].id) {
			this.props.fetchList(
				'/account/relation/',
				{
					method: 'POST',
					params: { user_id: props.queryResultData[0].id }
				},
				undefined
			)
		}
		this.props.valChange([], 'queryResultData')
		// this.getAddMemberInfo()
	}

	render() {
		const props = this.props
		const addMemberList = props.addMemberInfo.results || []
		const queryResultDataItem = props.queryResultData || []

		let addMemberListEle
		if (addMemberList.length) {
			addMemberListEle = (
				<div>
				{
					addMemberList.map((item, index) => (
						<div className="list-item add-member-item" key={index}>
							<img
								src={item.sender.portrait}
								alt=""
							/>
							<p>{item.sender.nickname}</p>
							<div className="add-member-item-btn">
								<a
									className="confirm-btn"
									onClick={this.handleChangeQuest.bind(this, item.id, 1)}
								>接受</a>
								<a
									className="cancel-btn"
									onClick={this.handleChangeQuest.bind(this, item.id, -1)}
								>拒绝</a>
							</div>
						</div>
					))
				}
				</div>
			)
		} else {
			addMemberListEle = (
				<div className="no-record">您还没有相关记录哦</div>
			)
		}


		let addMemberContentEle
		if (queryResultDataItem.length > 0) {
			addMemberContentEle = (
				queryResultDataItem.map((item, index) => (
					<div className="query-result-wrap" key={index}>
						<div className="list-item">
							<span>ID：{item.id}</span>
							<img
								src={item.portrait}
								alt=""
							/>
						</div>
						<div className="list-item">
							<span>昵称：</span>
							<p className="list-item-right">{item.nickname || '未填写'}</p>
						</div>
						<div className="list-item">
							<span>个性签名：</span>
							<p className="list-item-right">{item.intro || '这个家伙什么也没有留下'}</p>
						</div>
						<div className="list-item">
							<span></span>
							<p className="list-item-right">
								<a className="cancel-btn" onClick={this.cancelQueryAdd}>
								取消
								</a>
								<a className="confirm-btn" onClick={this.confirmQueryAdd}>
								确认添加
								</a>
							</p>
						</div>
					</div>
				))
			)
		} else {
			addMemberContentEle = addMemberListEle
		}

		let popupEle = props.modalState ?
			<Popup
				modal={props.modal}
				modalClose={props.modalClose}
				modalState={props.modalState}
				directTo={props.directTo}
			/> : ''

		return (
			<div className="container">
				<SelectModelEle
					valChange={props.valChange}
					handleChangeQuery={this.handleChangeQuery}
					queryID={props.queryID}
					selectData={props.selectData}
					modalOpen={props.modalOpen}
					fetchList={props.fetchList}
					directTo={props.directTo}
				/>
				{addMemberContentEle}
				{popupEle}
			</div>
		)
	}
}

export default ContactEle
