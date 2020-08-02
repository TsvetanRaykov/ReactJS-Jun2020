import React, { useState, useContext } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {
	Paper,
	Typography,
	FormControl,
	InputLabel,
	Input,
	Button,
	Checkbox,
	FormControlLabel,
	Box,
} from '@material-ui/core'
import UserContext from '../../../Context'

const styles = (theme) => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
			3
		)}px`,
	},
	avatar: {
		margin: theme.spacing(),
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing(2),
		width: 130,
	},
})

const Quiz = (props) => {
	const { quiz } = useContext(UserContext)

	const { classes, history } = props

	const [title, setTitle] = useState(quiz.title || '')
	const [description, setDescription] = useState(quiz.description || '')
	const [isPublic, setPublic] = useState(quiz.isPublic || false)

	const create = () => {
		quiz.title = title
		quiz.description = description
		quiz.isPublic = isPublic

		history.push('/quiz/create/questions')
	}

	const cancel = () => {
		if (history.length > 0) {
			history.goBack()
		} else {
			history.replace('/dashboard')
		}
	}

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Enter Quiz details
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => e.preventDefault() && false}
				>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='title'>Title</InputLabel>
						<Input
							id='title'
							name='title'
							autoComplete='off'
							autoFocus
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='description'>Description</InputLabel>
						<Input
							id='description'
							name='descripion'
							autoComplete='off'
							multiline
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<FormControlLabel
							control={
								<Checkbox
									checked={isPublic}
									onChange={(e) => setPublic(e.target.checked)}
									name='is-public'
									color='primary'
								/>
							}
							label='Public'
						/>
					</FormControl>
					<Box
						display='flex'
						justifyContent='space-between'
						flexDirection='row'
						bgcolor='background.paper'
					>
						<Button
							type='submit'
							variant='contained'
							color='secondary'
							onClick={cancel}
							className={classes.submit}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							onClick={create}
							className={classes.submit}
						>
							Next
						</Button>
					</Box>
				</form>
			</Paper>
		</main>
	)
}

export default withStyles(styles)(Quiz)
