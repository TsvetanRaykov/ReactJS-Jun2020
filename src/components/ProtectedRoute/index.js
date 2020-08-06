import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import userService from '../../services/userService'

import UserContext from '../../Context'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const user = userService.getCurrentUserEmail()
	const [imageUrl, setUserImage] = useState('')
	const [userName, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')

	useEffect(() => {
		console.log(userService.getCurrentUserImage())
		async function init() {
			setUserImage(() => userService.getCurrentUserImage())
			setUserEmail(() => userService.getCurrentUserEmail())
			setUserName(() => userService.getCurrentUsername())
		}
		init()
	}, [])

	const renderProtectedComponent = (props) => {
		return (
			<UserContext.Provider
				value={{
					userName: userName,
					userImg: imageUrl,
					userEmail: userEmail,
					quiz: {},
				}}
			>
				<Component {...rest} {...props} />
			</UserContext.Provider>
		)
	}

	return (
		<Route
			{...rest}
			render={(props) => {
				if (user) {
					return renderProtectedComponent(props)
				} else {
					return <Redirect to='/login' />
				}
			}}
		/>
	)
}

export default ProtectedRoute
