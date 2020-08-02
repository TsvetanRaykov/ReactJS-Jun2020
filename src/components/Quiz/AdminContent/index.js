import React, { useEffect, useState } from 'react'
import { Paper, Typography, withStyles } from '@material-ui/core'
import AddQuestionForm from '../../../components/Forms/AddQuestion'

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
})

const QuizContent = (props) => {
	const { classes, showAddQuestionForm } = props

	const [formOpen, setFormOpen] = useState(showAddQuestionForm)

	const onQuestionAdd = (question) => {
		setFormOpen(false)
	}

	useEffect(() => {
		setFormOpen(showAddQuestionForm)
	}, [showAddQuestionForm])

	return (
		<Paper className={classes.root}>
			<Typography component='h1' variant='h6'>
				Questions
			</Typography>
			{formOpen && <AddQuestionForm onSave={onQuestionAdd} />}
		</Paper>
	)
}

export default withStyles(styles)(QuizContent)
