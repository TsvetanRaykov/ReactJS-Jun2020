import React, { useContext, useState } from 'react'
import Header from '../../../components/Header'
import Context from '../../../Context'
import { Redirect } from 'react-router-dom'
import AdminMenu from '../../../components/Quiz/AdminMenu'
import Container from '@material-ui/core/Container'
import AdminContent from '../../../components/Quiz/AdminContent'

const AddQuestions = () => {
	const {
		quiz: { title },
	} = useContext(Context)

	const [isFormOpen, setFormOpen] = useState(false)
	const [isNewQuestion, setIsNewQuestion] = useState(false)

	const formHandler = (isFormOpen, isNewQuestion) => {
		setFormOpen(isFormOpen)
		setIsNewQuestion(isNewQuestion)
	}

	if (title) {
		return (
			<>
				<Header title={title} />
				<Container>
					<AdminMenu formHandler={formHandler} />
					<AdminContent
						formOpen={isFormOpen}
						formHandler={formHandler}
						isNewQuestion={isNewQuestion}
					/>
				</Container>
			</>
		)
	}

	return <Redirect to='/dashboard' />
}

export default AddQuestions
