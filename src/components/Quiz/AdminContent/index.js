import React from 'react'
import { Paper, Typography, withStyles } from '@material-ui/core'
import AddQuestionForm from '../../../components/Forms/AddQuestion'

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
})

const QuizContent = (props) => {
	let { classes, formOpen, formHandler } = props

	return (
		<Paper className={classes.root}>
			<Typography component='h1' variant='h6'>
				Questions
			</Typography>
			{formOpen && <AddQuestionForm onSave={formHandler} />}
		</Paper>
	)
}

export default withStyles(styles)(QuizContent)
