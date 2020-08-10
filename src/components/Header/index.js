import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {
	AppBar,
	Toolbar,
	Typography,
	Avatar,
	Box,
	Grid,
} from '@material-ui/core'
import AuthMenu from './AuthMenu'
import QuizTimer from '../../pages/Quiz/Progress/timer'

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	logo: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	timer: {
		fontSize: '30px',
		letterSpacing: '2px',
	},
})

const Header = (props) => {
	const { classes, title, timer } = props

	return (
		<AppBar position='static' className={classes.root}>
			<Toolbar>
				<Grid container alignItems='center'>
					<Grid item xs={4}>
						<Box display='flex' alignItems='center'>
							<Avatar src='/logo.jpg' alt='quizoom' className={classes.logo} />
							<Typography variant='h6' className={classes.title}>
								{`Quizoom${title ? ': ' + title : ''}`}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box
							display='flex'
							alignItems='center'
							justifyContent='center'
							className={classes.timer}
						>
							{timer && <QuizTimer timer={timer} />}
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box display='flex' alignItems='center' justifyContent='flex-end'>
							<AuthMenu />
						</Box>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default withStyles(styles)(Header)
