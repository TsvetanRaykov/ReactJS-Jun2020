import React, { useContext } from 'react'
import { Paper, Typography, withStyles } from '@material-ui/core'
import AddQuestionForm from '../../../components/Forms/AddQuestion'
import Context from '../../../Context'

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
})

const QuizContent = (props) => {
	const { classes, formOpen, formHandler } = props

	const {
		quiz: { questions },
	} = useContext(Context)

	const formClose = () => {
		formHandler(false)
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
			{formOpen && <AddQuestionForm formClose={formClose} />}
		</>
	)
}

export default withStyles(styles)(QuizContent)
