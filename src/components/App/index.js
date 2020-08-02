import React from 'react'
import UserContext from '../../Context'

const App = (props) => {
	return (
		<UserContext.Provider value={{ quiz: null }}>
			{props.children}
		</UserContext.Provider>
	)
}

export default App
