import React from 'react'

import { Paper, Button, Box } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'

const EditMenu = (props) => {
	return (
		<Paper>
			<Box display='flex' justifyContent='space-around' flexDirection='row'>
				<Button component={Link} to='/quiz/create'>
					Edit Quiz
				</Button>
				<Button>Add Question</Button>
				<Button>Save Quiz</Button>
			</Box>
		</Paper>
	)
}

export default withRouter(EditMenu)
