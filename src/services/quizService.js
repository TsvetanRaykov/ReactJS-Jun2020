import app from './firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'

class QuizService {
	constructor() {
		this.auth = app.auth()
		this.ref = app.firestore().collection('quizzes')
	}

	//TODO: Add Error Handling

	setQuiz(quiz) {
		quiz.createdBy = this.auth.currentUser.uid
		quiz.createdAt = new Date()
		return this.ref.doc(quiz.title).set(quiz)
	}

	async getPersonal() {
		const data = await this.ref
			.where('createdBy', '==', this.auth.currentUser.uid)
			.get()
		const quizList = []
		data.forEach((doc) => quizList.push({ id: doc.id, data: doc.data() }))
		return quizList
	}

	deleteQuiz(id) {
		return this.ref.doc(id).delete()
	}

	async getAvailable() {
		const data = await this.ref
			.where('createdBy', '!=', this.auth.currentUser.uid)
			.get()
		const quizList = []
		data.forEach((doc) => quizList.push({ id: doc.id, data: doc.data() }))
		return quizList
	}
}
export default new QuizService()
