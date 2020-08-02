import React, { useState, useEffect } from 'react'
import './styless.css'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Quiz from './pages/Quiz/Create'
import QuizQuestions from './pages/Quiz/Create/add-questions'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './components/theme'
import { CssBaseline } from '@material-ui/core'
import Loader from './components/Loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import firebase from './services/userService'

export default function Navigation() {
	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then((val) => {
			setFirebaseInitialized(val)
		})
	})

	return (
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
	)
}
