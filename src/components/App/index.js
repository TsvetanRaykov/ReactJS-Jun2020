import React, { useState, useEffect } from 'react'
import '../../styless.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import Quiz from '../../pages/Quiz/Create'
import QuizQuestions from '../../pages/Quiz/Create/addQuestions'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import { CssBaseline } from '@material-ui/core'
import Loader from '../Loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import auth from '../../services/userService'
import ProtectedRoute from '../ProtectedRoute'
import userService from '../../services/userService'
import UserContext from '../../Context'

const App = () => {
	const [firebaseInitialized, setFirebaseInitialized] = useState(false)
	const [user, setUser] = useState({})
	const [quiz, setQuiz] = useState({
		title: '',
		description: '',
		isPublic: false,
		questions: [],
	})

	const updateUser = ({ userImg, userName, userEmail }) => {
		setUser((current) => {
			const {
				userName: currentName,
				userImg: currentImg,
				userEmail: currentEmail,
				userId,
			} = current
			return {
				userName: userName || currentName,
				userImg: userImg || currentImg,
				userEmail: userEmail || currentEmail,
				userId,
			}
		})
	}

	const updateQuiz = ({ title, description, isPublic, questions }) => {
		console.log('updateQuiz', questions)

		setQuiz((current) => {
			const {
				title: currentTitle,
				description: currentDescription,
				questions: curentQuestions,
			} = current
			return {
				title: title || currentTitle,
				description: description || currentDescription,
				isPublic,
				questions:
					questions && questions.length > 0 ? questions : curentQuestions,
			}
		})
	}

	useEffect(() => {
		auth.isInitialized().then((val) => {
			setFirebaseInitialized(val)
			setUser(() => userService.getCurrentUser())
		})
	}, [])

	return (
		<UserContext.Provider
			value={{
				user,
				quiz,
				updateUser,
				updateQuiz,
			}}
		>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					{firebaseInitialized !== false ? (
						<Switch>
							<Route exact path='/' component={HomePage} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<ProtectedRoute exact path='/dashboard' component={Dashboard} />
							<ProtectedRoute exact path='/quiz/create' component={Quiz} />
							<ProtectedRoute
								exact
								path='/quiz/create/questions'
								component={QuizQuestions}
							/>
						</Switch>
					) : (
						<Loader />
					)}
				</BrowserRouter>
			</MuiThemeProvider>
		</UserContext.Provider>
	)
}

export default App
