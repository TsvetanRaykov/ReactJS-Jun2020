import React, { useContext, Fragment } from 'react'
import Header from '../../../components/Header'
import UserContext from '../../../Context'
import { Redirect } from 'react-router-dom'
import AdminMenu from '../../../components/Quiz/AdminMenu'
import Container from '@material-ui/core/Container'

const AddQuestions = () => {
	const { quiz } = useContext(UserContext)

	return quiz.title ? (
		<>
			<Header quiz={quiz} />
			<Container>
				<AdminMenu />
			</Container>
		</>
	) : (
		<Redirect to='/quiz/create' />
	)
}

export default AddQuestions
