import React, { useState, useEffect, useContext } from 'react'
import quizService from '../../services/quizService'
import Context from '../../Context'
import Loader from '../Loader'

const QuizList = () => {
	const {
		user: { userId },
	} = useContext(Context)
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		userId &&
			quizService.getPersonal(userId).then((data) => {
				setQuizzes(data)
				setLoading(false)
			})
	}, [userId])

	const renderQuizzes = () => {
		return (
			<ul>
				{quizzes.map((q) => {
					return <li key={q.title}>{q.title}</li>
				})}
			</ul>
		)
	}

	return loading ? <Loader /> : renderQuizzes()
}

export default QuizList
