import React, { useState, useEffect, useContext } from 'react'
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
	} = useContext(Context)
	const { classes } = props
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)

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

	const handleEditClick = (quizId) => {
		console.log(quizId)
	}

	const renderQuizzes = () => {
		console.log(quizzes)
		return (
			<div className={classes.root}>
				{quizzes.map(
					({ id, data: { title, description, isPublic, questions } }) => {
						isPublic = false
						return (
							<Accordion key={id}>
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
															onClick={() => handleEditClick(id)}
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
					}
				)}
			</div>
		)
	}

	return loading ? <Loader /> : renderQuizzes()
}

export default withStyles(styles)(QuizList)
