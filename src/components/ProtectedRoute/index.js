import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import userService from '../../services/userService'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const user = userService.getCurrentUser()
	return (
		<Route
			{...rest}
			render={(props) => {
				if (user) {
					console.log('yes')
					return <Component {...rest} {...props} />
				} else {
					console.log('no')
					return <Redirect to='/login' />
				}
			}}
		/>
	)
}

export default ProtectedRoute
