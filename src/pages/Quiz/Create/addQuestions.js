import React, { useContext, useState } from 'react'
import Header from '../../../components/Header'
import Context from '../../../Context'
import { Redirect } from 'react-router-dom'
import AdminMenu from '../../../components/Quiz/AdminMenu'
import Container from '@material-ui/core/Container'
import QuizContent from '../../../components/Quiz/AdminContent'

const AddQuestions = () => {
	const {
		quiz: { title },
	} = useContext(Context)

	const [isFormOpen, setFormOpen] = useState(false)

	const openForm = () => {
		setFormOpen(true)
	}

	const closeForm = () => {
		setFormOpen(false)
	}

	if (title) {
		return (
			<>
				<Header title={title} />
				<Container>
					<AdminMenu openForm={openForm} />
					<QuizContent formOpen={isFormOpen} formHandler={closeForm} />
				</Container>
			</>
		)
	}

	return <Redirect to='/dashboard' />
}

export default AddQuestions
