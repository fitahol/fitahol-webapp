import React, { PropTypes } from 'react'
import $storage from '../../services/storage'
// import { rootPath } from '../../config'
import { toast } from '../../services/util'
import { SearchIcon, AutoComplete } from '../../public/materialUi'

class SelectModelEle extends React.Component {
	static propTypes = {
		valChange: PropTypes.func.isRequired,
		modalOpen: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		fetchList: PropTypes.func.isRequired,
		selectData: PropTypes.array.isRequired,
		queryID: PropTypes.string,
		handleChangeQuery: PropTypes.func
	}

	static defaultProps = {
		selectData: []
	}

	constructor(props) {
		super(props)
		this.handleBuildNew = this.handleBuildNew.bind(this)
		this.pathname = location.pathname
	}

	componentDidMount() {
		if (this.pathname === '/build-course') {
			const userID = $storage.local.get('user_id') || $storage.local.get('self') || ''
			this.props.fetchList(
				`/account/member/card/?user_id=${userID}`,
				undefined,
				'selectData'
				// filter
			)
		}
	}


	handleBuildNew(name, index) {
		const props = this.props
		let selectItem = {}
		if (props.selectData.length) {
			selectItem = props.selectData[index] || {}
		}

		if (this.pathname === '/build-course') {
			if (!selectItem.user_id) {
				toast('学员不存在，请重新选择！')
				return
			}
			if (selectItem.user_id) {
				props.valChange(selectItem.user_id.toString(), 'queryID')
			}
		} else if (this.pathname === '/add-member') {
			props.valChange(name.toString(), 'queryID')
		}


		if (props.handleChangeQuery) props.handleChangeQuery(name)
	}


	render() {
		const props = this.props
		let selectStudentArr = []
		props.selectData.forEach((item) => {
			selectStudentArr.push(`${item.user_id} - ${item.nickname}`)
		})
		return (
			<div className="select-wrap">
				<div className="select-info">
					<SearchIcon color="#999" />
					<AutoComplete
						hintText="账号/名字(可查询)"
						openOnFocus={true}
						filter={AutoComplete.fuzzyFilter}
						dataSource={selectStudentArr}
						maxSearchResults={5}
						onNewRequest={this.handleBuildNew}
					/>
				</div>
			</div>
		)
	}
}

export default SelectModelEle
