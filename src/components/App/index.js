import React, { useState, useEffect } from 'react'
import './styless.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { CssBaseline } from '@material-ui/core'
import Loader from '../Loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import firebase from '../firebase'

export default function App() {
	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then((val) => {
			setFirebaseInitialized(val)
		})
	})

	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={HomePage} />{' '}
					<Route exact path='/login' component={Login} />{' '}
					<Route exact path='/register' component={Register} />{' '}
					<Route exact path='/dashboard' component={Dashboard} />{' '}
				</Switch>{' '}
			</BrowserRouter>{' '}
		</MuiThemeProvider>
	) : (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Loader />
		</MuiThemeProvider>
	)
}
