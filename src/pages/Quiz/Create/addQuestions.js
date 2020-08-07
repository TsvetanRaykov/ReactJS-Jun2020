import React, { useContext, Fragment, useState, useEffect } from 'react'
import Header from '../../../components/Header'
import UserContext from '../../../Context'
import { Redirect } from 'react-router-dom'
import AdminMenu from '../../../components/Quiz/AdminMenu'
import Container from '@material-ui/core/Container'
import QuizContent from '../../../components/Quiz/AdminContent'
import quizService from '../../../services/quizService'

const AddQuestions = () => {
	const { quiz } = useContext(UserContext)

	const [isFormOpen, setFormOpen] = useState(false)
	const [questions, setQuestions] = useState([])

	useEffect(() => {
		console.log(quiz)
	})

	const openForm = () => {
		setFormOpen(true)
	}

	const closeForm = (questions) => {
		setFormOpen(false)
		setQuestions(questions)
	}

	const saveQuiz = async () => {
		quiz.questions = questions
		await quizService.addQuiz(quiz)
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
