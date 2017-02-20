/**
 * /schedule/event/analytics/
 * month-count week-count
  event-count 课程总数  weekday_report本周每天完成数据
 */
import React, { PropTypes } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip,
 PieChart, Pie, Cell, CartesianGrid } from 'recharts'

export default class CourseCharts extends React.Component {
	static propTypes = {
		fetchList: PropTypes.func.isRequired,
		valChange: PropTypes.func.isRequired,
		directTo: PropTypes.func.isRequired,
		modal: PropTypes.object.isRequired,
		modalState: PropTypes.bool.isRequired,
		modalOpen: PropTypes.func.isRequired,
		modalClose: PropTypes.func.isRequired,
		courseChartsData: PropTypes.object.isRequired
	}
	static defaultPropTypes = {
		activeIndex: 0
	}

	constructor(props) {
		super(props)
		this.COLORS = ['#0088FE', '#FFBB28']
	}

	componentDidMount() {
		document.body.style.backgroundColor = '#edf0f5'
		const props = this.props
		function filter(courseChartsData) {
			const weekdayReport = courseChartsData.weekday_report || []
			weekdayReport.forEach((item) => {
				const itemResult = item
				item.dateX = Object.keys(itemResult)[0]
				item.dateY = Object.values(itemResult)[0]
			})
			return courseChartsData
		}
		props.fetchList(
			'/schedule/event/analytics/',
			undefined,
			'courseChartsData',
			filter
		)
	}

	render() {
		const props = this.props
		const courseChartsData = props.courseChartsData
		const weekdayReport = props.courseChartsData.weekday_report || []
		const pieData = [
			{ value: courseChartsData.event_remain },
			{ value: courseChartsData.event_total }
		]
		const courseChartsEle = (
			<LineChart
				width={300}
				height={200}
				data={weekdayReport}
			>
				<XAxis
					dataKey="dateX"
					height={50}
					padding={{ right: 20 }}
				/>
				<YAxis domain={['0 ', 'dataMax+4']} />
				<Tooltip />
				<Line
					type="monotone"
					dataKey="dateY"
					stroke="#8884d8"
					fill="#8884d8"
				/>
			</LineChart>
		)

		const pieEle = (
			<PieChart
				width={800}
				height={180}
			>
				<Pie
					data={pieData}
					cx={120}
					cy={100}
					innerRadius={60}
					outerRadius={80}
				>
				{
					pieData.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={this.COLORS[index]}
						/>
					))
				}
				</Pie>
				<g>
					<text x={120} y={100} dy={-12} textAnchor="middle" fill="#333">
						剩余课程数
					</text>
					<text x={120} y={100} dy={6} textAnchor="middle" fill="#333">
						{courseChartsData.event_remain}节
					</text>
					<text x={120} y={100} dy={24} textAnchor="middle" fill="#333">
						{(courseChartsData.event_remain / courseChartsData.event_total * 100).toFixed(1)}%
					</text>
				</g>
			</PieChart>

		)
		return (
			<div className="container">
				<div className="course-charts-wrap">
					{courseChartsEle}
				</div>
				<div className="week-month-course">
					<div>
						<h4>本周</h4>
						<span>{courseChartsData.week_count}节</span>
						<p>2016-08-12至2016-11-06</p>
					</div>
					<div>
						<h4>本月</h4>
						<span>{courseChartsData.month_count}节</span>
						<p>2016-08-12至2016-11-06</p>
					</div>
				</div>
				<div className="course-footer-wrap">
					{pieEle}
					<p className="course-desc">课程总数：{courseChartsData.event_total}节</p>
				</div>
			</div>
		)
	}
}
