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
import QuizRezult from './QuizResult'
import { processQuizResult } from '../../../utils'
const QuizProgress = (props) => {
	const {
		match: {
			params: { id },
		},
		history,
	} = props

	const [quiz, setQuiz] = useState({})
	const [loading, setLoading] = useState(false)
	const [start, setStart] = useState(false)
	const [timeLeft, setTimeLeft] = useState(0)
	const [quizResult, setQuizResult] = useState(null)

	const [modalDialog, setModalDialog] = useState({
		title: '',
		message: '',
		open: false,
		handleYes: () => {},
		handleNo: () => {},
	})

	useEffect(() => {
		setLoading(true)
		quizService
			.getById(atob(id))
			.then((data) => {
				setQuiz(data)
			})
			.finally(() => setLoading(false))
	}, [id])

	history.block(function () {
		if (start) {
			setModalDialog({
				title: 'Please confirm',
				message: 'Are you ready to end the quiz?',
				open: true,
				handleYes: () => {
					setTimer({ start: false })
					setModalDialog({ open: false })
					setStart(false)
					setQuizResult(() => processQuizResult(quiz))
				},
				handleNo: () => {
					setModalDialog({ open: false })
				},
			})
			return false
		}
	})

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
		setModalDialog({
			title: 'Please confirm',
			message: 'Are you ready to end the quiz?',
			open: true,
			handleYes: () => {
				setTimer({ start: false })
				setModalDialog({ open: false })
				setStart(false)
				setQuizResult(() => processQuizResult(quiz))
			},
			handleNo: () => {
				setModalDialog({ open: false })
			},
		})
	}

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: green[500],
				contrastText: '#fff',
			},
		},
	})

	const renderQuizResult = () => {
		if (!quizResult) {
			return
		}
		const [correct, total] = quizResult

		return (
			<QuizRezult
				correct={correct}
				total={total}
				duration={60 * 20 - timeLeft - 1}
			/>
		)
	}

	const renderButtonStart = () => (
		<ThemeProvider theme={theme}>
			<Box display='flex' py={2} flexDirection='row' justifyContent='center'>
				<Button
					variant='contained'
					color='primary'
					onClick={handleQuizStartClick}
				>
					Start
				</Button>
			</Box>
		</ThemeProvider>
	)

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
				{quizResult ? renderQuizResult() : renderButtonStart()}
			</Container>
		)
	}

	return (
		<Fragment>
			<Header timer={timer} />
			<ModalDialog {...modalDialog} />
			{loading ? <Loader /> : renderQuizIntro()}
		</Fragment>
	)
}

export default withRouter(QuizProgress)
