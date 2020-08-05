import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { AppBar, Toolbar, Typography, Avatar } from '@material-ui/core'
import AuthMenu from './AuthMenu'

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
})

const Header = (props) => {
	const { classes, title } = props

	return (
		<AppBar position='static' className={classes.root}>
			<Toolbar>
				<Avatar src='/logo.jpg' alt='quizoom' className={classes.logo} />
				<Typography variant='h6' className={classes.title}>
					{title}
				</Typography>
				<AuthMenu />
			</Toolbar>
		</AppBar>
	)
}

export default withStyles(styles)(Header)
