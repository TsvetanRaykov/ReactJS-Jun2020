import React, { useEffect, useState } from 'react'
import quizService from '../../services/quizService'
import { withRouter } from 'react-router-dom'
import Loader from '../Loader'
import {
	Typography,
	makeStyles,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { padZero } from '../../utils'

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightMedium,
	},
	subheading: {},
}))

const CompletedQuizList = (props) => {
	const [loading, setLoading] = useState(false)
	const [quizzes, setQuizzes] = useState([])
	const [expanded, setExpanded] = useState(false)
	const classes = useStyles()
	const timeOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}

	useEffect(() => {
		setLoading(true)
		quizService
			.getCompleted()
			.then((data) => {
				setQuizzes(data)
			})
			.finally(() => setLoading(false))
	}, [])

	const handleChange = (panel) => (_, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}
	const renderQuizList = () => (
		<div className={classes.root}>
			{quizzes ? (
				Object.keys(quizzes).map((id) => {
					const { title, description, completions } = quizzes[id]
					return (
						<Accordion
							key={id}
							expanded={expanded === id}
							onChange={handleChange(id)}
						>
							<AccordionSummary expandIcon={<ExpandMore />}>
								<Box display='flex' flexDirection='column'>
									<p className={classes.heading}>{title}</p>
									<p className={classes.subheading}>{description}</p>
								</Box>
							</AccordionSummary>
							<AccordionDetails>
								<TableContainer component={Paper}>
									<Table
										className={classes.table}
										size='small'
										aria-label='a dense table'
									>
										<TableHead>
											<TableRow>
												<TableCell>Date</TableCell>
												<TableCell align='right'>duration</TableCell>
												<TableCell align='right'>correct</TableCell>
												<TableCell align='right'>total</TableCell>
												<TableCell align='right'>score</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{completions.map((row, i) => {
												const minutes = padZero(parseInt(row.duration / 60, 10))
												const seconds = padZero(parseInt(row.duration % 60, 10))
												return (
													<TableRow key={i}>
														<TableCell component='th' scope='row'>
															{row.passedAt
																.toDate()
																.toLocaleDateString('bg', timeOptions)}
														</TableCell>
														<TableCell align='right'>{`${minutes} : ${seconds}`}</TableCell>
														<TableCell align='right'>{row.correct}</TableCell>
														<TableCell align='right'>{row.total}</TableCell>
														<TableCell align='right'>{row.score}</TableCell>
													</TableRow>
												)
											})}
										</TableBody>
									</Table>
								</TableContainer>
							</AccordionDetails>
						</Accordion>
					)
				})
			) : (
				<Typography variant='caption'>
					You haven't completed quizzes yet
				</Typography>
			)}
		</div>
	)

	return loading ? <Loader /> : renderQuizList()
}

export default withRouter(CompletedQuizList)
