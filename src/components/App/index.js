import React, { useState, useEffect } from 'react'
import UserContext from '../../Context'
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

const App = () => {
	const [firebaseInitialized, setFirebaseInitialized] = useState(false)
	const [imageUrl, setUserImage] = useState('')
	const [userName, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')

	useEffect(() => {
		auth.isInitialized().then((val) => {
			setFirebaseInitialized(val)

			auth.getCurrentUserImage().then((img) => {
				setUserImage(img)
			})
			setUserEmail(() => auth.getCurrentUserEmail())
			setUserName(() => auth.getCurrentUsername())
		})
	}, [])

	return (
		<UserContext.Provider
			value={{
				userName: userName,
				userImg: imageUrl,
				userEmail: userEmail,
				quiz: {},
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
							<Route exact path='/dashboard' component={Dashboard} />
							<Route exact path='/quiz/create' component={Quiz} />
							<Route
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
