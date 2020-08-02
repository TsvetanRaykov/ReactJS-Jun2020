import React, { useState, createRef } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
} from '@material-ui/core'
const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	// menuButton: {
	// 	marginRight: theme.spacing(2),
	// },
	title: {
		flexGrow: 1,
	},
})

const Header = (props) => {
	const { classes, quiz } = props

	const menuWrapper = createRef()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleMenu = (event) => {
		setAnchorEl(menuWrapper.current)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<AppBar position='static' className={classes.root}>
			<Toolbar>
				{/* <IconButton
					edge='start'
					className={classes.menuButton}
					color='inherit'
					aria-label='menu'
				></IconButton> */}
				<Typography variant='h6' className={classes.title}>
					{quiz.title}
				</Typography>
				<div>
					<IconButton
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={handleMenu}
						ref={menuWrapper}
						color='inherit'
					>
						<Avatar src='https://randomuser.me/api/portraits/men/7.jpg' />
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
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default withStyles(styles)(Header)
