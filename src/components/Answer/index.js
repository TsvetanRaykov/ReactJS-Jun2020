import React from 'react'
import { FormControlLabel, Radio } from '@material-ui/core'

const Answer = (props) => {
	const { answer } = props
	return <FormControlLabel value={answer} control={<Radio />} label={answer} />
}

export default Answer
