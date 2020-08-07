import React, { useState, useEffect, useContext } from 'react'
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
	RadioGroup,
	TextField,
	IconButton,
} from '@material-ui/core'
import Answer from '../../Answer'
import { DeleteForever, Add } from '@material-ui/icons'

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
})

const AddQuestionForm = (props) => {
	const { classes, formClose } = props
	const {
		quiz: { questions, isPublic },
		updateQuiz,
	} = useContext(Context)

	const [question, setQuestion] = useState('')
	const [answers, setAnswers] = useState([])
	const [newAnswer, setNewAnswer] = useState('')
	const [value, setValue] = React.useState('')

	const onSaveClick = () => {
		const newQuestions = questions.slice(0).concat({ question, answers })
		updateQuiz({ questions: newQuestions, isPublic })
		formClose()
	}

	const [open, setOpen] = React.useState(false)

	useEffect(() => {
		let correct
		answers.forEach((a) => {
			if (a.text === value) {
				a.correct = true
				correct = a
			}
		})
		if (!correct) {
			setValue('')
		}
		setAnswers(answers)
	}, [value, answers])

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

	const handleRadioChange = (event) => {
		setValue(event.target.value)
	}

	const handleDeleteAnswer = (key) => {
		setAnswers(answers.filter((a) => a.text !== key))
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
				<Box display='flex' justifyContent='space-around' flexDirection='row'>
					<Button
						type='button'
						variant='contained'
						color='secondary'
						onClick={handleClickOpen}
						startIcon={<Add />}
					>
						Answer
					</Button>
				</Box>
				<Box display='flex' justifyContent='space-around' flexDirection='row'>
					<FormControl fullWidth>
						<RadioGroup
							aria-label='quiz'
							name='quiz'
							value={value}
							onChange={handleRadioChange}
						>
							{answers.map((a) => {
								return (
									<Box
										key={a.text}
										display='flex'
										justifyContent='space-between'
										flexDirection='row'
									>
										<Answer answer={a.text} />
										<IconButton
											aria-label='delete'
											color='secondary'
											onClick={() => handleDeleteAnswer(a.text)}
										>
											<DeleteForever />
										</IconButton>
									</Box>
								)
							})}
						</RadioGroup>
					</FormControl>
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
					disabled={!value}
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

export default withStyles(styles)(AddQuestionForm)
