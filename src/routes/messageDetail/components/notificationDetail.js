import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'

const CardExampleWithAvatar = (props) => (
	<div>
		<CardTitle title={props.title} subtitle={props.show_time} />
		<CardText>
			{props.description}
		</CardText>
	</div>
)

export default CardExampleWithAvatar
