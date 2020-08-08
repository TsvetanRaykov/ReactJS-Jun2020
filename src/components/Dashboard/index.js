import React from 'react'
import Header from '../Header'
import { Grid, Paper, withStyles, Box, Typography } from '@material-ui/core'
import UserData from './UserData'
import QuizList from './QuizList'

const styles = (theme) => ({
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		margin: theme.spacing(1),
	},
	content: {
		height: '85vh',
	},
})

const Profile = (props) => {
	const { classes } = props

	return (
		<>
			<Header />
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper}>
						<Box className={classes.content}>
							<UserData />
							<br />
							<hr />
							<Typography variant='h6'>Your Quizzes</Typography>
							<QuizList />
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper}>
						<Box className={classes.content}>Right Side</Box>
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default withStyles(styles)(Profile)
