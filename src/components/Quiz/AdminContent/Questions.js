import React from 'react'
import {
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Tooltip,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'

const Questions = (props) => {
	const { questions, editQuestion } = props

	return (
		<List>
			{questions.map(({ question }, i) => {
				return (
					<ListItem key={question}>
						<ListItemText primary={question} />
						<ListItemSecondaryAction>
							<Tooltip title='Edit question and answers' placement='left'>
								<IconButton
									edge='end'
									aria-label='edit'
									color='primary'
									onClick={() => editQuestion(i)}
								>
									<Edit />
								</IconButton>
							</Tooltip>
						</ListItemSecondaryAction>
					</ListItem>
				)
			})}
		</List>
	)
}

export default Questions
