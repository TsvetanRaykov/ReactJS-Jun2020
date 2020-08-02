import React from 'react'
import UserContext from '../../Context'

const App = (props) => {
	return (
		<UserContext.Provider value={{ quiz: {} }}>
			{props.children}
		</UserContext.Provider>
	)
}

export default App
