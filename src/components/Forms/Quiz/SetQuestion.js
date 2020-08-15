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
import { Add, Cancel, Delete } from '@material-ui/icons'
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
		quiz: { questions },
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
		if (activeQuestionIndex >= 0) {
			newQuestions.splice(activeQuestionIndex, 1, { question, answers })
		} else {
			const idx = newQuestions.findIndex((q) => q.question === question)
			if (idx >= 0) {
				newQuestions.splice(idx, 1, { question, answers })
			} else {
				newQuestions.push({ question, answers })
			}
		}

		updateQuiz({ questions: newQuestions })
		formClose()
	}

	useEffect(() => {
		const ansList = questions[activeQuestionIndex]?.answers || []
		setAnswers(() => ansList.map((a) => Object.assign({}, a)))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const selectedValue = () => {
		for (const a of answers) {
			if (a.correct) {
				return a.text
			}
		}
		return ''
	}

	const onCancelClick = () => {
		formClose()
	}

	const onDeleteClick = () => {
		//TODO: MAke it nicer
		if (window.confirm('Are you sure?')) {
			const newQuestions = questions.slice(0)
			newQuestions.splice(activeQuestionIndex, 1)
			updateQuiz({ questions: newQuestions })
			formClose()
		}
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
					aria-labelledby='answer-form-dialog'
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
				<Button
					className={classes.button}
					type='button'
					variant='outlined'
					color='secondary'
					onClick={onCancelClick}
					startIcon={<Cancel />}
				>
					Cancel
				</Button>
				{activeQuestionIndex >= 0 && (
					<Button
						className={classes.button}
						type='button'
						variant='contained'
						color='secondary'
						onClick={onDeleteClick}
						startIcon={<Delete />}
					>
						Delete
					</Button>
				)}
			</form>
		</Paper>
	)
}

export default withStyles(styles)(SetQuestionForm)
