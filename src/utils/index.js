const padZero = (num) => (num < 10 ? `0${num}` : `${num}`)

const processQuizResult = (quiz) => {
	const {
		data: { questions },
	} = quiz
	let incorrect = 0
	for (const question of questions) {
		const { answers, userAnswer } = question
		if (userAnswer === undefined) {
			incorrect++
			continue
		}

		let correct = false
		for (let i = 0; i < answers.length; i++) {
			const answer = answers[i]
			if (answer.correct && answer.text === userAnswer) {
				correct = true
				break
			}
		}
		if (correct === false) {
			incorrect++
		}
	}

	return [questions.length - incorrect, questions.length]
}

const timeOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
}

export { padZero, processQuizResult, timeOptions }
