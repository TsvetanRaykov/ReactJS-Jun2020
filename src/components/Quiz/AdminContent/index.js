import React, { useContext, useState, useEffect } from 'react'
import { Paper, Typography, withStyles } from '@material-ui/core'
import SetQuestionForm from '../../Forms/Quiz/SetQuestion'
import Context from '../../../Context'
import Questions from './Questions'

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
})

const AdminContent = (props) => {
	const { classes, formOpen, formHandler, isNewQuestion } = props

	const {
		quiz: { questions },
	} = useContext(Context)

	const [activeQuestionIndex, setActiveQuestion] = useState(-1)

	const [questionList, setQuestionList] = useState(questions.slice(0))

	const formClose = () => {
		setQuestionList(questions)
		formHandler(false, isNewQuestion)
		setActiveQuestion(-1)
	}

	const editQuestion = (i) => {
		setActiveQuestion(i)
		setQuestionList((current) => {
			return current.filter((a, n) => n !== i)
		})
		formHandler(true, false)
	}

	useEffect(() => {
		setQuestionList(questions)
	}, [questions])

	return (
		<>
			<Paper className={classes.root}>
				<Typography component='h1' variant='h6'>
					Questions
				</Typography>
				<Questions questions={questionList} editQuestion={editQuestion} />
			</Paper>
			{formOpen && (
				<SetQuestionForm
					formClose={formClose}
					activeQuestionIndex={activeQuestionIndex}
				/>
			)}
		</>
	)
}

export default withStyles(styles)(AdminContent)
