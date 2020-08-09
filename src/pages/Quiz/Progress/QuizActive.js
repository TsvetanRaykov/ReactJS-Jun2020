import React, { Fragment, useState } from 'react'

import QuizNav from './Nav'
import QuizActiveBody from './Body'
import ModalDialog from './ModalDialog'

const QuizActive = (props) => {
	const {
		quiz: {
			data: { questions },
		},
	} = props

	const [active, setActiveQuestion] = useState(0)
	const [rerender, setRerender] = useState(null)
	const handleAnswer = (a) => {
		questions[active].userAnswer = a
		setRerender(a)
	}

	const changeQuestion = (i) => {
		setActiveQuestion(i)
	}

	return (
		<Fragment>
			<ModalDialog />
			<QuizNav
				questions={questions}
				changeQuestion={changeQuestion}
				rerender={rerender}
			/>
			<QuizActiveBody
				question={questions[active]}
				handleAnswer={handleAnswer}
			/>
		</Fragment>
	)
}

export default QuizActive
