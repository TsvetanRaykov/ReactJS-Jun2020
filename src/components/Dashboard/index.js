import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Typography,
	Paper,
	Avatar,
	CircularProgress,
	Button,
} from '@material-ui/core'

import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import userService from '../../services/userService'
import { withRouter } from 'react-router-dom'

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
		marginTop: theme.spacing(3),
	},
})

function Dashboard(props) {
	const { classes } = props
	const [quote, setQuote] = useState('')

	useEffect(() => {
		if (userService.getCurrentUsername()) {
			userService.getCurrentUserQuote().then((quote) => setQuote(quote))
		} else {
			props.history.replace('/login')
		}
	}, [props.history])

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Hello {userService.getCurrentUsername()}
				</Typography>
				<Typography component='h1' variant='h5'>
					Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
				</Typography>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					component={Link}
					to='/quiz/create'
					className={classes.submit}
				>
					Create Quiz
				</Button>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='secondary'
					onClick={logout}
					className={classes.submit}
				>
					Logout
				</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await userService.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))
