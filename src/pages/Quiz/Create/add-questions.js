import React, { useContext, Fragment, useState } from 'react'
import Header from '../../../components/Header'
import UserContext from '../../../Context'
import { Redirect } from 'react-router-dom'
import AdminMenu from '../../../components/Quiz/AdminMenu'
import Container from '@material-ui/core/Container'
import QuizContent from '../../../components/Quiz/AdminContent'

const AddQuestions = () => {
	const { quiz } = useContext(UserContext)

	const [addQuestion, setAddQuestion] = useState(false)

	const handleAddQuestion = () => {
		setAddQuestion(true)
	}

	if (quiz.title) {
		return (
			<Fragment>
				<Header quiz={quiz} />
				<Container>
					<AdminMenu addQuestion={handleAddQuestion} />
					<QuizContent showAddQuestionForm={addQuestion} />
				</Container>
			</Fragment>
		)
	}

	return <Redirect to='/quiz/create' />
}

export default AddQuestions
