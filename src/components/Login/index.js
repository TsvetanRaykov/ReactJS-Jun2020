import React, { useState, useContext } from 'react'
import {
	Typography,
	Paper,
	Avatar,
	Button,
	FormControl,
	Input,
	InputLabel,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import userService from '../../services/userService'
import Loader from '../Loader'
import UserContext from '../../Context'

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
	form: {
		width: '100%',
		marginTop: theme.spacing(),
	},
	submit: {
		marginTop: theme.spacing(3),
	},
})

const SignIn = (props) => {
	const { classes } = props
	const { updateUser } = useContext(UserContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	return loading ? (
		<Loader />
	) : (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => e.preventDefault() && false}
				>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='email'>Email Address</InputLabel>
						<Input
							id='email'
							name='email'
							autoComplete='off'
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='password'>Password</InputLabel>
						<Input
							name='password'
							type='password'
							id='password'
							autoComplete='off'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						onClick={login}
						className={classes.submit}
					>
						Sign in
					</Button>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='secondary'
						component={Link}
						to='/register'
						className={classes.submit}
					>
						Register
					</Button>
				</form>
			</Paper>
		</main>
	)

	async function login() {
		setLoading(true)
		try {
			await userService.login(email, password)
			updateUser({
				userImg: userService.getCurrentUserImage(),
				userName: userService.getCurrentUsername(),
				userEmail: userService.getCurrentUserEmail(),
			})
			setLoading(false)
			props.history.replace('/dashboard')
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}
}

export default withRouter(withStyles(styles)(SignIn))
