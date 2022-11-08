import React from 'react'
import {
	FormControlLabel,
	Radio,
	FormControl,
	RadioGroup,
	Box,
	IconButton,
} from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'

const Answers = (props) => {
	const { selectedValue, answers, handleRadioChange, handleDeleteAnswer } =
		props

	return (
		<FormControl fullWidth>
			<RadioGroup
				aria-label='quiz'
				name='quiz'
				value={selectedValue()}
				onChange={handleRadioChange}
			>
				{answers.map((a, i) => {
					return (
						<Box
							key={a.text}
							display='flex'
							justifyContent='space-between'
							flexDirection='row'
						>
							<FormControlLabel
								value={a.text}
								control={<Radio />}
								label={a.text}
							/>
							<IconButton
								data-cy={`delete-answer-${i}`}
								aria-label='delete'
								color='secondary'
								onClick={() => handleDeleteAnswer(a.text)}
							>
								<DeleteForever />
							</IconButton>
						</Box>
					)
				})}
			</RadioGroup>
		</FormControl>
	)
}

export default Answers
