import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import userService from '../../services/userService'
import {
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	CircularProgress,
} from '@material-ui/core'

import UserContext from '../../Context'

const AuthMenu = (props) => {
	const [anchorEl, setAnchorEl] = useState(null)

	const {
		updateQuiz,
		user: { userImg: img },
	} = useContext(UserContext)

	const [userName, setUserName] = useState('')
	const [userImg, setUserImg] = useState('')

	useEffect(() => {
		setUserImg(userService.getCurrentUser().userImg)
		setUserName(userService.getCurrentUser().userName)
	}, [])

	useEffect(() => {
		setUserImg(img)
	}, [img])

	const open = Boolean(anchorEl)

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleAddQuiz = () => {
		updateQuiz(null)
		props.history.push('/quiz/edit')
	}

	const handleProfileClick = () => {
		props.history.push('/dashboard')
	}

	async function logout() {
		setAnchorEl(null)
		await userService.logout()
		props.history.push('/')
	}

	return (
		<div>
			<Typography component='span'>{userName}</Typography>
			<IconButton
				aria-label='account of current user'
				aria-controls='menu-appbar'
				aria-haspopup='true'
				onClick={handleMenu}
				color='inherit'
			>
				{userImg ? <Avatar src={userImg} /> : <CircularProgress />}
			</IconButton>
			<Menu
				id='menu-appbar'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleProfileClick}>Profile</MenuItem>
				<MenuItem onClick={handleAddQuiz}>Add quiz</MenuItem>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
		</div>
	)
}

export default withRouter(AuthMenu)
