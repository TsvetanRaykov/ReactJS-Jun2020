import React, { useState, useEffect } from 'react'
import '../../styless.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import QuizCreate from '../../pages/Quiz/Create'
import QuizQuestions from '../../pages/Quiz/Create/addQuestions'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Loader from '../Loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import auth from '../../services/userService'
import ProtectedRoute from '../ProtectedRoute'
import userService from '../../services/userService'
import UserContext from '../../Context'
import QuizProgress from '../../pages/Quiz/Progress'

const App = () => {
	const [firebaseInitialized, setFirebaseInitialized] = useState(false)
	const [user, setUser] = useState({})
	const [quiz, setQuiz] = useState(emptyQuiz())

	function emptyQuiz() {
		return {
			title: '',
			description: '',
			duration: 0,
			isPublic: false,
			questions: [],
		}
	}

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

	const updateQuiz = (newState) => {
		if (!newState) {
			setQuiz(emptyQuiz())
			return
		}
		setQuiz((current) => {
			const {
				title: currentTitle,
				description: currentDescription,
				questions: curentQuestions,
				duration: currentDuration,
			} = current
			const { title, description, isPublic, questions, duration } = newState
			return {
				title: title || currentTitle,
				description: description || currentDescription,
				isPublic,
				questions:
					questions && questions.length > 0 ? questions : curentQuestions,
				duration: duration || currentDuration,
			}
		})
	}

	useEffect(() => {
		auth.isInitialized().then((val) => {
			setFirebaseInitialized(val)
			setUser(() => userService.getCurrentUser())
		})
	}, [])

	const theme = createMuiTheme()

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{firebaseInitialized ? (
				<UserContext.Provider
					value={{
						user,
						quiz,
						updateUser,
						updateQuiz,
					}}
				>
					<BrowserRouter>
						<Switch>
							<Route exact path='/' component={HomePage} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<ProtectedRoute exact path='/dashboard' component={Dashboard} />
							<ProtectedRoute exact path='/quiz/edit' component={QuizCreate} />
							<ProtectedRoute
								exact
								path='/quiz/edit/questions'
								component={QuizQuestions}
							/>
							<ProtectedRoute
								exact
								path='/quiz/progress/:id'
								component={QuizProgress}
							/>
						</Switch>
					</BrowserRouter>
				</UserContext.Provider>
			) : (
				<Loader />
			)}
		</MuiThemeProvider>
	)
}

export default App
