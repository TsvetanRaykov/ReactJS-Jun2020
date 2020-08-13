import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import quizService from '../../services/quizService'
import Loader from '../Loader'
import {
	withStyles,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Chip,
	Box,
	AccordionActions,
	Button,
} from '@material-ui/core'
import {
	ExpandMore,
	Public,
	VpnLock,
	DeleteForever,
	Settings,
} from '@material-ui/icons'

import Constext from '../../Context'

const styles = (theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightMedium,
		marginLeft: theme.spacing(1),
	},
	label: {
		'& span': {
			color: theme.palette.text.primary,
		},
	},
	question: {
		'& span': {
			fontWeight: theme.typography.fontWeightMedium,
		},
	},
	button: {
		minWidth: '100px',
	},
})

const OwnQuizList = (props) => {
	const { classes } = props
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)
	const [expanded, setExpanded] = useState(false)
	const { updateQuiz } = useContext(Constext)

	const loadOwnQuizes = () => {
		quizService
			.getPersonal()
			.then((data) => {
				setQuizzes(data)
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		loadOwnQuizes()
	}, [])

	const renderChip = (isPublic) => {
		return isPublic ? (
			<Chip
				className={classes.label}
				variant='outlined'
				color='primary'
				size='small'
				icon={<Public />}
				label='public'
			/>
		) : (
			<Chip
				className={classes.label}
				variant='outlined'
				color='secondary'
				size='small'
				icon={<VpnLock />}
				label='private'
			/>
		)
	}

	const handleEditClick = (data) => {
		updateQuiz({ ...data })
		props.history.push('/quiz/edit/questions')
	}

	const handleDeleteClick = (id) => {
		//TODO: Make nicer
		if (window.confirm('Are you sure?')) {
			setLoading(true)
			quizService.deleteQuiz(id).finally(() => loadOwnQuizes())
		}
	}
	const handleChange = (panel) => (_, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}
	const renderQuizzes = () => {
		return (
			<div className={classes.root}>
				{quizzes.length > 0 ? (
					quizzes.map(({ id, data }) => {
						const { title, description, isPublic } = data
						return (
							<Accordion
								key={id}
								expanded={expanded === id}
								onChange={handleChange(id)}
							>
								<AccordionSummary expandIcon={<ExpandMore />}>
									{renderChip(isPublic)}
									<Typography className={classes.heading}>{title}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Box display='flex'>{description}</Box>
								</AccordionDetails>
								<AccordionActions>
									<Button
										size='small'
										variant='contained'
										color='secondary'
										className={classes.button}
										startIcon={<DeleteForever />}
										onClick={() => handleDeleteClick(id)}
									>
										Delete
									</Button>
									<Button
										size='small'
										variant='contained'
										color='primary'
										className={classes.button}
										startIcon={<Settings />}
										onClick={() => handleEditClick(data)}
									>
										Edit
									</Button>
								</AccordionActions>
							</Accordion>
						)
					})
				) : (
					<Typography variant='caption'>
						You haven't created quizzes yet
					</Typography>
				)}
			</div>
		)
	}

	return loading ? <Loader /> : renderQuizzes()
}

export default withRouter(withStyles(styles)(OwnQuizList))
