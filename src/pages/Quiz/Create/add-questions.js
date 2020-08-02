import React, { useContext } from 'react'
import Header from '../../../components/Header'
import UserContext from '../../../Context'
import NotFound from '../../../components/NotFound'

const AddQuestions = () => {
	const { quiz } = useContext(UserContext)

	console.log(quiz)

	return quiz !== null ? (
		<>
			<Header title={quiz.title} />
			<b>Add Questions</b>
		</>
	) : (
		<NotFound />
	)
}

export default AddQuestions
