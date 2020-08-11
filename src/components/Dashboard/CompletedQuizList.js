import React, { useEffect, useState } from 'react'
import quizService from '../../services/quizService'

const CompletedQuizList = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		quizService.getCompleted().then((data) => {
			console.log(data)
		})
	}, [])

	return <></>
}

export default CompletedQuizList
