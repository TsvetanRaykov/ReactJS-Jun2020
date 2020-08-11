import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import quizService from '../../services/quizService'
import Context from '../../Context'
import Loader from '../Loader'
import {
	withStyles,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Chip,
	List,
	ListItem,
	ListItemText,
	Box,
	IconButton,
	Tooltip,
	AccordionActions,
} from '@material-ui/core'
import {
	ExpandMore,
	Public,
	VpnLock,
	Settings,
	DeleteForever,
} from '@material-ui/icons'

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
})

const OwnQuizList = (props) => {
	const { updateQuiz } = useContext(Context)
	const { classes } = props
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)
	const [expanded, setExpanded] = useState(false)

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
						const { title, description, isPublic, questions, duration } = data
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

									{/* <List
										className={classes.root}
										dense
										subheader={
											<>
												<Box
													display='flex'
													justifyContent='space-between'
													alignItems='center'
												>
													<Typography className={classes.heading}>{`Duration: ${
														duration / 60
													} min`}</Typography>
													<div>
														<Tooltip title='Delete Quiz'>
															<IconButton
																color='secondary'
																aria-label='delete quiz'
																onClick={() => handleDeleteClick(id)}
															>
																<DeleteForever />
															</IconButton>
														</Tooltip>
														<Tooltip title='Edit Quiz'>
															<IconButton
																color='primary'
																aria-label='edit quiz'
																onClick={() => handleEditClick(data)}
															>
																<Settings />
															</IconButton>
														</Tooltip>
													</div>
												</Box>
												<Typography variant='caption'>{description}</Typography>
											</>
										}
									>
										{questions.map((q) => (
											<ListItem key={q.question}>
												<ListItemText
													className={classes.question}
													primary={q.question}
												/>
											</ListItem>
										))}
									</List> */}
								</AccordionDetails>
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
