import BaseService from './baseService'

class HistoryService extends BaseService {
	constructor() {
		super()
		this.ref = this.app.firestore().collection('history')
	}

	addHistory(quizResult) {
		const { quiz, correct, total, duration } = quizResult

		const history = {
			uid: this.uid,
			correct,
			total,
			duration: quiz.data.duration - duration,
			passedAt: new Date(),
			quiz: quiz.id,
			score: parseFloat(correct / total).toFixed(2),
		}
		this.ref.add(history)
	}
}

export default new HistoryService()
