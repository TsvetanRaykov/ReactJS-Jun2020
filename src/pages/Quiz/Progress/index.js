import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../../../components/Header'
import { Button } from '@material-ui/core'

const QuizProgress = (props) => {
	const {
		history,
		match: {
			params: { id },
		},
	} = props

	history.block(() => {
		if (true) {
			return window.confirm('Do you want to leave?')
		}
	})

	const [timer, setTimer] = useState({
		duration: 0,
		start: false,
		complete: () => {},
	})

	const handleQuizStartClick = () => {
		setTimer(() => {
			return {
				duration: 10,
				start: true,
				complete: () => {
					console.log('Time expire')
				},
			}
		})
	}

	return (
		<Fragment>
			<Header timer={timer} />
			<Button onClick={handleQuizStartClick}>Start</Button>
		</Fragment>
	)
}

export default withRouter(QuizProgress)
