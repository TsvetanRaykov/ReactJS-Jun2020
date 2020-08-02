import React, { useState } from 'react'
import {
	Paper,
	Button,
	FormControl,
	Input,
	InputLabel,
	withStyles,
} from '@material-ui/core'

const styles = (theme) => ({
	submit: {
		margin: theme.spacing(),
	},
})

const AddQuestionForm = (props) => {
	const { classes, onSave } = props

	const [question, setQuestion] = useState('')

	const onSaveClick = () => {
		onSave(question)
	}

	return (
		<Paper>
			<form onSubmit={(e) => e.preventDefault() && false}>
				<FormControl margin='normal' required fullWidth>
					<InputLabel htmlFor='question'>Question</InputLabel>
					<Input
						id='question'
						name='question'
						autoComplete='off'
						autoFocus
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
					/>
				</FormControl>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					onClick={onSaveClick}
					className={classes.submit}
				>
					Save
				</Button>
			</form>
		</Paper>
	)
}

export default withStyles(styles)(AddQuestionForm)
