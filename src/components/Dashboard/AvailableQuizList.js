import React, { useEffect, useState } from 'react'
import quizService from '../../services/quizService'
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from '@material-ui/core'
import Loader from '../Loader'
import { withRouter } from 'react-router-dom'

const AvalableQuizList = (props) => {
	const { history } = props

	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		quizService
			.getAvailable()
			.then((data) => {
				setQuizzes(data)
			})
			.finally(() => setLoading(false))
	}, [])

	const handleQuizClick = (id) => {
		//TODO: make nicer
		console.log('handleQuizClick', id)
		if (window.confirm('Are you ready to pass that quiz?')) {
			history.push(`/quiz/progress/${btoa(id)}`)
		}
	}

	const renderQuizList = () => (
		<List>
			{quizzes.map(({ id, data }) => (
				<ListItem
					key={id}
					alignItems='flex-start'
					dense
					button
					onClick={() => handleQuizClick(id)}
				>
					<ListItemAvatar>
						<Avatar alt='TODO' src={data.authorImg}></Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={data.title}
						secondary={data.description}
					></ListItemText>
				</ListItem>
			))}
		</List>
	)

	return loading ? <Loader /> : renderQuizList()
}

export default withRouter(AvalableQuizList)
