import React, { useState, useEffect, createRef } from 'react'
import { Tooltip } from '@material-ui/core'

const EditableTextField = (props) => {
	const { text, callback } = props

	const [isInEditMode, setEdiMode] = useState(false)
	const [newText, setNewtext] = useState(text)

	const textInput = createRef()

	const chageEditMode = (e) => {
		setEdiMode(true)
	}

	const saveText = () => {
		if (callback && newText !== text) {
			callback(newText)
		}
		setEdiMode(false)
	}

	useEffect(() => {
		setNewtext(text)
	}, [text])

	useEffect(() => {
		if (textInput.current) {
			textInput.current.focus()
		}
	}, [textInput])

	const renderEditView = () => {
		return (
			<div>
				<input
					type='text'
					onChange={(e) => setNewtext(e.target.value)}
					onBlur={saveText}
					value={newText}
					ref={textInput}
				/>
			</div>
		)
	}

	const renderDefaultView = () => (
		<Tooltip placement='bottom-start' title='Double click to edit'>
			<div onDoubleClick={chageEditMode}>{newText}</div>
		</Tooltip>
	)

	return isInEditMode ? renderEditView() : renderDefaultView()
}

export default EditableTextField
