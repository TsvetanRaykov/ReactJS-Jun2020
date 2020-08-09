import React, { useState, useEffect, Fragment } from 'react'

import {
	Paper,
	Box,
	RadioGroup,
	Radio,
	Typography,
	FormControlLabel,
	Container,
	FormControl,
	FormLabel,
} from '@material-ui/core'

const QuizActiveBody = (props) => {
	const { handleAnswer, question } = props
	const [answers, setAnswers] = useState([])

	const [value, setValue] = useState(question.userAnswer || '')
	const handleChange = (event) => {
		setValue(event.target.value)
		handleAnswer(event.target.value)
	}

	useEffect(() => {
		setAnswers(question?.answers || [])
		setValue(question.userAnswer || '')
	}, [question])

	return (
		<Fragment>
			<Container>
				<Paper>
					<Box m={2} px={3} py={2} display='flex'>
						<Typography variant='h6'>{question?.question}</Typography>
					</Box>
				</Paper>
			</Container>
			<Container>
				<Paper>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='flex-start'
						px={5}
						py={2}
					>
						<FormControl component='fieldset'>
							<FormLabel component='legend'></FormLabel>
							<RadioGroup value={value} onChange={handleChange}>
								{answers.map((a) => (
									<FormControlLabel
										key={a.text}
										value={a.text}
										control={<Radio color='primary' />}
										label={a.text}
									/>
								))}
							</RadioGroup>
						</FormControl>
					</Box>
				</Paper>
			</Container>
		</Fragment>
	)
}

export default QuizActiveBody
