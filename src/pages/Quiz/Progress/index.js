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

const QuizProgress = (props) => {
	const {
		match: {
			params: { id },
		},
	} = props

	const [quiz, setQuiz] = useState({})
	const [loading, setLoading] = useState(false)
	const [start, setStart] = useState(false)

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
	})

	const handleQuizStartClick = () => {
		setStart(true)

		setTimer(() => ({
			duration: 60 * 20,
			start: true,
			complete: () => {
				console.log('Time is out')
				setStart(false)
				setTimer(() => ({
					start: false,
				}))
			},
		}))
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
			return <QuizActive quiz={quiz} />
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
			{loading ? <Loader /> : renderQuizIntro()}
		</Fragment>
	)
}

export default withRouter(QuizProgress)
