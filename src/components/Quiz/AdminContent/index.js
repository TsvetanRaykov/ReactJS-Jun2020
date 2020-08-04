import React, { useState } from 'react'
import { Paper, Typography, withStyles } from '@material-ui/core'
import AddQuestionForm from '../../../components/Forms/AddQuestion'

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
})

const QuizContent = (props) => {
	const { classes, formOpen, formHandler } = props
	const [questions, setQuestions] = useState([])

	const addQuestionHandler = (question) => {
		if (question) {
			setQuestions((current) => {
				const updated = [...current, question]
				formHandler(updated)
				return updated
			})
		}
	}

	return (
		<>
			<Paper className={classes.root}>
				<Typography component='h1' variant='h6'>
					Questions
				</Typography>
				{questions.map((q, i) => {
					return <div key={i}>{q.question}</div>
				})}
			</Paper>
			{formOpen && <AddQuestionForm onSave={addQuestionHandler} />}
		</>
	)
}

export default withStyles(styles)(QuizContent)
