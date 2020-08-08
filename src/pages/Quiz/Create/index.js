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
import Header from '../../../components/Header'

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
	const {
		quiz: { title, description, isPublic },
		updateQuiz,
	} = useContext(UserContext)

	const { classes, history } = props

	const [quizTitle, setTitle] = useState(title)
	const [quizDescription, setDescription] = useState(description)
	const [quizIsPublic, setPublic] = useState(isPublic)

	const create = () => {
		updateQuiz({
			title: quizTitle,
			description: quizDescription,
			isPublic: quizIsPublic,
		})
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
		<>
			<Header title={quizTitle} />
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
								value={quizTitle}
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
								value={quizDescription}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</FormControl>
						<FormControl margin='normal' required fullWidth>
							<FormControlLabel
								control={
									<Checkbox
										checked={quizIsPublic}
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
								Continue
							</Button>
						</Box>
					</form>
				</Paper>
			</main>
		</>
	)
}

export default withStyles(styles)(Quiz)
