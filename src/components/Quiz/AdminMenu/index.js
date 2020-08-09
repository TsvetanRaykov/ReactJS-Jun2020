import React, { useContext } from 'react'

import { Paper, Button, Box } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import Context from '../../../Context'
import quizService from '../../../services/quizService'

const EditMenu = (props) => {
	const { formHandler, history } = props
	const { quiz } = useContext(Context)
	const saveQuizHandler = () => {
		//TODO: Validate Data
		quizService.setQuiz(quiz)
		history.push('/dashboard')
	}

	const addQuestionHandler = () => {
		formHandler(true, true)
	}

	return (
		<Paper>
			<Box display='flex' justifyContent='space-around' flexDirection='row'>
				<Button component={Link} to='/quiz/create'>
					Edit Quiz
				</Button>
				<Button onClick={addQuestionHandler}>Add Question</Button>
				<Button onClick={saveQuizHandler}>Save Quiz</Button>
			</Box>
		</Paper>
	)
}

export default withRouter(EditMenu)
