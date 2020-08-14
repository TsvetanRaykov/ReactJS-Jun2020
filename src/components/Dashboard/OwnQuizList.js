import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import quizService from '../../services/quizService'
import { padZero, timeOptions } from '../../utils'
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
	Avatar,
	Tooltip,
} from '@material-ui/core'
import {
	ExpandMore,
	Public,
	VpnLock,
	DeleteForever,
	Settings,
	AccessTime,
} from '@material-ui/icons'
import ModalDialog from '../../components/shared/ModalDialog'
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
	duration: {
		display: 'inline-block',
		fontWeight: 'bold',
		margin: theme.spacing(0, 1, 0, 0),
		minWidth: '50px',
	},
	head: {
		fontWeight: theme.typography.fontWeightMedium,
		backgroundColor: 'rgba(192,192,192,0.1)',
	},
})

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}))(Tooltip)

const OwnQuizList = (props) => {
	const { classes } = props
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)
	const [expanded, setExpanded] = useState(false)
	const { updateQuiz, updateQuizSnapshot } = useContext(Constext)

	const [modalDialog, setModalDialog] = useState({
		title: '',
		message: '',
		open: false,
		handleYes: () => {},
		handleNo: () => {},
	})

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
		updateQuizSnapshot({ ...data })
		props.history.push('/quiz/edit/questions')
	}

	const handleDeleteClick = (id) => {
		setModalDialog({
			title: 'Are you sure?',
			handleYes: () => {
				setModalDialog({ open: false })
				setLoading(true)
				quizService.deleteQuiz(id).finally(() => loadOwnQuizes())
			},
			handleNo: () => {
				setModalDialog({ open: false })
			},
			open: true,
		})
	}

	const handleChange = (panel) => (_, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	const handleReleaseComplete = (qid, uid, arr) => {
		setModalDialog({
			title: 'Are you sure?',
			message:
				'This will allow that person to try the quiz again. But will remove it from that list.',
			handleYes: () => {
				setModalDialog({ open: false })
				setLoading(true)
				quizService.releaseQuiz(
					qid,
					arr.filter((u) => u.uid !== uid)
				)
				loadOwnQuizes()
			},
			handleNo: () => {
				setModalDialog({ open: false })
			},
			open: true,
		})
	}

	const renderQuizzes = () => {
		return (
			<div className={classes.root}>
				{quizzes.length > 0 ? (
					quizzes.map(({ id, data }) => {
						const { title, description, isPublic, duration, completedBy } = data

						const min = padZero(duration / 60)
						const sec = padZero(duration % 60)

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
									<Box display='flex' alignItems='center'>
										<AccessTime />
										&nbsp;
										<div className={classes.duration}>{`${min} : ${sec} `}</div>
										{description}
									</Box>
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
								<Box display='flex' alignItems='center'>
									{completedBy && completedBy.length > 0 && (
										<Accordion elevation={0} className={classes.root}>
											<AccordionSummary
												expandIcon={<ExpandMore />}
												className={classes.head}
											>
												<Typography className={classes.heading}>
													Completed by
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												{completedBy.map((p) => {
													const {
														correct,
														passedAt,
														timeLeft,
														total,
													} = p.result

													const min = parseInt((duration - timeLeft) / 60, 10)
													const sec = parseInt((duration - timeLeft) % 60, 10)

													return (
														<HtmlTooltip
															key={p.uid}
															title={
																<>
																	<em>
																		{passedAt
																			.toDate()
																			.toLocaleDateString('en', timeOptions)}
																	</em>
																	<br />
																	<em>Result:</em>&nbsp;
																	<b>{`${correct}/${total}`}</b>
																	<br />
																	<em>Time:</em>&nbsp;
																	<b>{`${min}:${sec}`}</b>
																</>
															}
														>
															<Chip
																avatar={<Avatar alt={p.email} src={p.photo} />}
																label={p.email}
																onDelete={(e) =>
																	handleReleaseComplete(
																		id,
																		p.uid,
																		completedBy.slice(0)
																	)
																}
																variant='outlined'
																color='primary'
															/>
														</HtmlTooltip>
													)
												})}
											</AccordionDetails>
										</Accordion>
									)}
								</Box>
							</Accordion>
						)
					})
				) : (
					<Typography variant='caption'>
						You haven't created quizzes yet
					</Typography>
				)}
				<ModalDialog {...modalDialog} />
			</div>
		)
	}

	return loading ? <Loader /> : renderQuizzes()
}

export default withRouter(withStyles(styles)(OwnQuizList))
