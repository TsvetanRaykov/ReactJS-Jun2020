import React, { useState, useContext, useEffect } from 'react'
import {
	Paper,
	Button,
	FormControl,
	Input,
	InputLabel,
	withStyles,
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	createMuiTheme,
	ThemeProvider,
	TextField,
} from '@material-ui/core'
import Answers from './Answers'
import { Add, Cancel } from '@material-ui/icons'
import { green } from '@material-ui/core/colors'
import Context from '../../../Context'

const styles = (theme) => ({
	submit: {
		margin: theme.spacing(),
	},
	paper: {
		marginTop: theme.spacing(),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& form': {
			width: '90%',
		},
	},
	dialog: { width: '90%' },
	button: {
		margin: theme.spacing(1),
	},
})

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[500],
			contrastText: '#fff',
		},
	},
})

const SetQuestionForm = (props) => {
	const { classes, formClose, activeQuestionIndex } = props
	const {
		quiz: { questions, isPublic },
		updateQuiz,
	} = useContext(Context)

	const [open, setOpen] = useState(false)
	const [question, setQuestion] = useState(
		questions[activeQuestionIndex]?.question || ''
	)
	const [newAnswer, setNewAnswer] = useState('')
	const [answers, setAnswers] = useState([])
	const onSaveClick = () => {
		const newQuestions = questions.slice(0)
		newQuestions.splice(activeQuestionIndex, 1, { question, answers })
		updateQuiz({ questions: newQuestions, isPublic })
		formClose()
	}

	useEffect(() => {
		setAnswers(() =>
			questions[activeQuestionIndex].answers.map((a) => Object.assign({}, a))
		)
	}, [activeQuestionIndex, questions])

	const selectedValue = () => {
		for (const a of answers) {
			if (a.correct) {
				return a.text
			}
		}
		return ''
	}

	const onCancelClick = () => {
		console.log(answers)
		console.log(questions[activeQuestionIndex]?.answers)
		formClose()
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		if (newAnswer) {
			setAnswers([
				...answers.filter((a) => a.text !== newAnswer),
				{ text: newAnswer, correct: false },
			])
			setNewAnswer('')
		}
		setOpen(false)
	}

	const handleDeleteAnswer = (key) => {
		setAnswers(answers.filter((a) => a.text !== key))
	}

	const handleRadioChange = (event) => {
		setAnswers(
			answers.map((a) => {
				a.correct = a.text === event.target.value
				return a
			})
		)
	}

	return (
		<Paper className={classes.paper}>
			<form onSubmit={(e) => e.preventDefault() && false}>
				<FormControl margin='normal' required fullWidth>
					<InputLabel htmlFor='question'>Question</InputLabel>
					<Input
						id='question'
						name='question'
						autoComplete='off'
						multiline
						autoFocus
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
					/>
				</FormControl>
				<ThemeProvider theme={theme}>
					<Box display='flex' justifyContent='flex-end' flexDirection='row'>
						<Button
							className={classes.button}
							type='button'
							variant='contained'
							color='secondary'
							onClick={onCancelClick}
							startIcon={<Cancel />}
						>
							Cancel
						</Button>
						<Button
							className={classes.button}
							type='button'
							variant='contained'
							color='primary'
							onClick={handleClickOpen}
							startIcon={<Add />}
						>
							Answer
						</Button>
					</Box>
				</ThemeProvider>
				<Box display='flex' justifyContent='space-around' flexDirection='row'>
					<Answers
						answers={answers}
						handleRadioChange={handleRadioChange}
						handleDeleteAnswer={handleDeleteAnswer}
						selectedValue={selectedValue}
					/>
				</Box>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='form-dialog'
					fullWidth={true}
				>
					<DialogContent>
						<TextField
							autoFocus
							margin='dense'
							id='answer'
							label='Answer'
							type='text'
							fullWidth
							multiline
							value={newAnswer}
							onChange={(e) => {
								setNewAnswer(e.currentTarget.value)
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='primary'>
							Cancel
						</Button>
						<Button onClick={handleClose} color='primary'>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				<Button
					type='submit'
					disabled={!selectedValue()}
					variant='contained'
					color='primary'
					onClick={onSaveClick}
					className={classes.submit}
				>
					Save Question
				</Button>
			</form>
		</Paper>
	)
}

export default withStyles(styles)(SetQuestionForm)
