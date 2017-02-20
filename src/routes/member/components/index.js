/**
 * Created by madeling on 8/1/16.
 */
import React, { PropTypes } from 'react'
import Contact from './contacts'

class ContactEle extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		memberList: PropTypes.array.isRequired
	}

	static defaultProps = {
		memberList: []
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
			'/account/member/',
			{ querys: {
				time: Date.now()
			} },
			'memberList',
			dataFilter
		)
	}
	render() {
		const memberList = this.props.memberList
		return (
			<Contact
				response={memberList}
			/>
		)
	}
}

export default ContactEle
