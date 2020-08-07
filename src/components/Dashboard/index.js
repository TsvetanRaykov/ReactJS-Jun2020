import React, { createRef, useContext } from 'react'
import Header from '../Header'
import {
	Grid,
	Paper,
	withStyles,
	Box,
	Avatar,
	CircularProgress,
	Tooltip,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
} from '@material-ui/core'
import UserContext from '../../Context'
import userService from '../../services/userService'
import EditableTextField from '../EditableTextField'
import { PersonRounded, EmailRounded } from '@material-ui/icons'

const styles = (theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		margin: theme.spacing(1),
	},
	content: {
		height: '85vh',
	},
	avatar: {
		width: theme.spacing(15),
		height: theme.spacing(15),
		cursor: 'pointer',
	},
	file: {
		opacity: '0%',
		position: 'absolute',
	},
})

const Profile = (props) => {
	const { classes } = props
	const {
		user: { userImg, userName, userEmail },
		updateUser,
	} = useContext(UserContext)

	const fileRef = createRef()

	const imageHandler = (event) => {
		if (event.target.files.length === 0) {
			return
		}
		const imageFile = event.target.files[0]
		const reader = new FileReader()

		reader.onload = () => {
			if (reader.readyState === 2) {
				updateUser({
					userImg: reader.result,
				})
				userService.addImage(imageFile)
			}
		}

		reader.readAsDataURL(imageFile)
	}

	const triggerInputFile = () => {
		if (fileRef.current !== undefined && fileRef.current.click !== undefined) {
			fileRef.current.click()
		}
	}

	const saveName = (newName) => {
		updateUser({ userName: newName })
		userService.updateName(newName)
	}

	return (
		<>
			<Header title='Quizoom'></Header>
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper}>
						<Box className={classes.content}>
							<Grid container>
								<Grid item xs={4} md={3} lg={2}>
									{userImg ? (
										<Tooltip
											title={
												<>
													Is that you? <br />
													Click to change the picture.
												</>
											}
										>
											<Avatar
												className={classes.avatar}
												alt={userName}
												src={userImg}
												onClick={triggerInputFile}
											/>
										</Tooltip>
									) : (
										<CircularProgress />
									)}
									<input
										id='img-input'
										accept='image/*'
										type='file'
										className={classes.file}
										onChange={imageHandler}
										ref={fileRef}
									/>
								</Grid>
								<Grid item xs={8} md={9} lg={10}>
									<List className={classes.root}>
										<ListItem>
											<ListItemAvatar>
												<PersonRounded color='primary' />
											</ListItemAvatar>
											<EditableTextField text={userName} callback={saveName} />
										</ListItem>
										<Divider />
										<ListItem>
											<ListItemAvatar>
												<EmailRounded color='primary' />
											</ListItemAvatar>
											<ListItemText primary={userEmail} />
										</ListItem>
									</List>
								</Grid>
							</Grid>
							<br />
							<hr />
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
