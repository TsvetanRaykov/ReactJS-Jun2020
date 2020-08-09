import React, { Fragment, useState, useEffect } from 'react'

const QuizTimer = (props) => {
	const { timer } = props
	const { duration, start, complete } = timer || {}
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)

	const [timerHandler, setTimerHandler] = useState(0)

	const startTimer = () => {
		const interval = 1000 // ms
		let timer = duration
		let expected = Date.now() + interval
		setTimerHandler(() => {
			return setTimeout(step, interval)
		})

		function step() {
			const dt = Date.now() - expected

			setMinutes(parseInt(timer / 60, 10))
			setSeconds(parseInt(timer % 60, 10))

			if (--timer < 0) {
				complete()
				clearTimeout(timerHandler)
				return
			}

			expected += interval
			setTimerHandler(() => {
				return setTimeout(step, Math.max(0, interval - dt))
			})
			console.log(timerHandler)
		}
	}

	const padZero = (num) => (num < 10 ? `0${num}` : `${num}`)

	useEffect(() => {
		if (start) {
			startTimer()
		}

		return () => {
			clearTimeout(timerHandler)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [start])

	return <Fragment>{`${padZero(minutes)} : ${padZero(seconds)}`}</Fragment>
}

export default QuizTimer
