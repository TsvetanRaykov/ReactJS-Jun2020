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

const deepEqual = (object1, object2) => {
	const keys1 = Object.keys(object1)
	const keys2 = Object.keys(object2)

	if (keys1.length !== keys2.length) {
		return false
	}

	for (const key of keys1) {
		const val1 = object1[key]
		const val2 = object2[key]
		const areObjects = isObject(val1) && isObject(val2)
		if (
			(areObjects && !deepEqual(val1, val2)) ||
			(!areObjects && val1 !== val2)
		) {
			return false
		}
	}

	return true
}

const isObject = (object) => {
	return object != null && typeof object === 'object'
}

export { padZero, processQuizResult, timeOptions, deepEqual }
