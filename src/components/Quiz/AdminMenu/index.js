import React, { useContext, useState, useEffect } from 'react'

import { Paper, Button, Box, makeStyles } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import Context from '../../../Context'
import quizService from '../../../services/quizService'
import { deepEqual } from '../../../utils'
import Green from '@material-ui/core/colors/green'
import ModalDialog from '../../shared/ModalDialog'

const useStyles = makeStyles((theme) => ({
	green: {
		backgroundColor: Green[500],
		color: theme.palette.primary.contrastText,
		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
}))

const EditMenu = (props) => {
	const classes = useStyles()

	const { formHandler, history } = props
	const { quiz, quizSnapshot } = useContext(Context)
	const [canSave, setCanSave] = useState(true)
	const [notSaved, setNotSaved] = useState(false)
	const [modalDialog, setModalDialog] = useState({
		title: '',
		message: '',
		open: false,
		handleYes: () => {},
		handleNo: () => {},
	})

	history.block(function ({ pathname }) {
		if (notSaved) {
			setModalDialog({
				title: 'There are unsaved changes. Do you want to cancel them?',
				open: true,
				handleYes: () => {
					setNotSaved(false)
					console.log(pathname)
					history.push(pathname)
					setModalDialog({ open: false })
				},
				handleNo: () => {
					setModalDialog({ open: false })
				},
			})
			return false
		}
	})

	useEffect(() => {
		const errors = { questions: '' }

		errors.questions =
			!quiz.questions || quiz.questions.length === 0
				? 'The Quiz must have at least one question.'
				: ''
		const result = !Object.entries(errors).find(([k, v]) => v.length > 0)
		setCanSave(result)
	}, [quiz.questions])

	useEffect(() => {
		setNotSaved(!deepEqual(quiz, quizSnapshot))
	}, [quiz, quizSnapshot])

	const addQuestionHandler = () => {
		formHandler(true, true)
	}
	const saveQuizHandler = () => {
		quizService.setQuiz(quiz)
		history.push('/dashboard')
	}

	return (
		<>
			<Paper>
				<Box
					display='flex'
					justifyContent='space-between'
					flexDirection='row'
					p={1}
				>
					<Button
						color='primary'
						variant='outlined'
						component={Link}
						to='/quiz/edit'
					>
						Edit Details
					</Button>
					<Button
						color='primary'
						variant='outlined'
						onClick={addQuestionHandler}
					>
						Add Question
					</Button>
					<Button
						className={notSaved ? classes.green : ''}
						color='primary'
						variant='outlined'
						onClick={saveQuizHandler}
						disabled={!canSave}
					>
						Save Quiz
					</Button>
				</Box>
			</Paper>
			<ModalDialog {...modalDialog} />
		</>
	)
}

export default withRouter(EditMenu)
