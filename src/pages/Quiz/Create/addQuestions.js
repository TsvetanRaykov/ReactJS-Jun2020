import React, { useContext, Fragment, useState } from 'react'
import Header from '../../../components/Header'
import UserContext from '../../../Context'
import { Redirect } from 'react-router-dom'
import AdminMenu from '../../../components/Quiz/AdminMenu'
import Container from '@material-ui/core/Container'
import QuizContent from '../../../components/Quiz/AdminContent'

const AddQuestions = () => {
	const { quiz } = useContext(UserContext)

	const [isFormOpen, setIsFormOpen] = useState(false)

	const openForm = () => {
		setIsFormOpen(true)
	}

	const closeForm = (update) => {
		setIsFormOpen(false)
		// TODO: if update - refresh question list
	}

	const saveQuiz = () => {
		console.log(quiz)
	}

	if (quiz.title) {
		return (
			<Fragment>
				<Header quiz={quiz} />
				<Container>
					<AdminMenu addQuestion={openForm} saveQuiz={saveQuiz} />
					<QuizContent formOpen={isFormOpen} formHandler={closeForm} />
				</Container>
			</Fragment>
		)
	}

	return <Redirect to='/quiz/create' />
}

export default AddQuestions
