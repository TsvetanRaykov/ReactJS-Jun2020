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
} from '@material-ui/core'
import { ExpandMore, Public, VpnLock, Settings } from '@material-ui/icons'

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

const QuizList = (props) => {
	const {
		user: { userId },
		updateQuiz,
	} = useContext(Context)
	const { classes } = props
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)
	const [expanded, setExpanded] = useState(false)

	useEffect(() => {
		userId &&
			quizService.getPersonal(userId).then((data) => {
				setQuizzes(data)
				setLoading(false)
			})
	}, [userId])

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
		props.history.push('/quiz/create/questions')
	}

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}
	const renderQuizzes = () => {
		return (
			<div className={classes.root}>
				{quizzes.length > 0 ? (
					quizzes.map(({ id, data }) => {
						const { title, description, isPublic, questions } = data
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
									<List
										className={classes.root}
										dense
										subheader={
											<>
												<Box display='flex' justifyContent='flex-end'>
													<Tooltip title='Edit Quiz' placement='left'>
														<IconButton
															color='primary'
															aria-label='edit quiz'
															onClick={() => handleEditClick(data)}
														>
															<Settings />
														</IconButton>
													</Tooltip>
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
									</List>
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

export default withRouter(withStyles(styles)(QuizList))
