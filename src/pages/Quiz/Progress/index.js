import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../../../components/Header'
import {
	Button,
	Paper,
	Typography,
	Box,
	ThemeProvider,
	createMuiTheme,
	Container,
} from '@material-ui/core'
import quizService from '../../../services/quizService'
import Loader from '../../../components/Loader'
import { green } from '@material-ui/core/colors'
import QuizActive from './QuizActive'
import ModalDialog from './ModalDialog'

const QuizProgress = (props) => {
	const {
		match: {
			params: { id },
		},
	} = props

	const [quiz, setQuiz] = useState({})
	const [loading, setLoading] = useState(false)
	const [start, setStart] = useState(false)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [dialogTitle, setDialogTitle] = useState('')
	const [dialogMessage, setDialogMessage] = useState('')
	const [timeLeft, setTimeLeft] = useState(0)

	useEffect(() => {
		setLoading(true)
		quizService
			.getById(atob(id))
			.then((data) => {
				setQuiz(data)
			})
			.finally(() => setLoading(false))
	}, [id])

	// history.block(() => {
	// 	if (true) {
	// 		return window.confirm('Do you want to leave?')
	// 	}
	// })

	const [timer, setTimer] = useState({
		duration: 0,
		start: false,
		complete: () => {},
		progress: () => {},
	})

	const handleQuizStartClick = () => {
		setStart(true)

		setTimer(() => ({
			duration: 60 * 20,
			start: true,
			complete: () => {
				console.log('The time is out')
				setStart(false)
				setTimer(() => ({
					start: false,
				}))
			},
			progress: (s) => {
				setTimeLeft(s)
			},
		}))
	}

	const handleEndQuizClick = () => {
		setDialogMessage('Are you ready to end the quiz?')
		setDialogTitle('Please confirm')
		setDialogOpen(true)
	}

	const handleDialogClose = (confirm) => {
		if (confirm) {
			setStart(false)
			const result = processResult()
			displayResult(result)
			return
		}
		setDialogOpen(false)
	}

	const processResult = () => {
		const {
			data: { questions },
		} = quiz
		let incorrect = 0
		for (const question of questions) {
			const { answers, userAnswer } = question
			if (userAnswer === undefined) {
				incorrect++
				continue
			}

			let correct = false
			for (let i = 0; i < answers.length; i++) {
				const answer = answers[i]
				if (answer.correct && answer.text === userAnswer) {
					correct = true
					break
				}
			}
			if (correct === false) {
				incorrect++
			}
		}

		return [questions.length - incorrect, questions.length]
	}

	const displayResult = ([correct, total]) => {
		setDialogMessage('Thank you!')
		setDialogTitle(`${correct} / ${total} // ${timeLeft}`)

		console.log(timeLeft)
		setDialogOpen(true)
	}

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: green[500],
				contrastText: '#fff',
			},
		},
	})

	const renderQuizIntro = () => {
		const { data } = quiz

		if (start) {
			return <QuizActive quiz={quiz} handleEndQuizClick={handleEndQuizClick} />
		}

		return (
			<Container>
				<Paper>
					<Box
						display='flex'
						my={3}
						py={2}
						flexDirection='row'
						justifyContent='center'
					>
						<Typography component='h1' variant='h4'>
							{data?.title}
						</Typography>
					</Box>
					<Box
						display='flex'
						py={2}
						flexDirection='row'
						justifyContent='center'
					>
						<Typography>{data?.description}</Typography>
					</Box>
				</Paper>
				<ThemeProvider theme={theme}>
					<Box
						display='flex'
						py={2}
						flexDirection='row'
						justifyContent='center'
					>
						<Button
							variant='contained'
							color='primary'
							onClick={handleQuizStartClick}
						>
							Start
						</Button>
					</Box>
				</ThemeProvider>
			</Container>
		)
	}

	return (
		<Fragment>
			<Header timer={timer} />
			<ModalDialog
				open={dialogOpen}
				handleClose={handleDialogClose}
				title={dialogTitle}
				message={dialogMessage}
			/>
			{loading ? <Loader /> : renderQuizIntro()}
		</Fragment>
	)
}

export default withRouter(QuizProgress)
