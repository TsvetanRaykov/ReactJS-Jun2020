import app from './firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'

class QuizService {
	constructor() {
		this.auth = app.auth()
		this.ref = app.firestore().collection('quizzes')
	}

	get uid() {
		return this.auth.currentUser.uid
	}

	//TODO: Add Error Handling

	setQuiz(quiz) {
		quiz.createdBy = this.uid
		quiz.createdAt = new Date()
		quiz.authorImg = this.auth.currentUser.photoURL
		return this.ref.doc(quiz.title).set(quiz)
	}

	async getPersonal() {
		const data = await this.ref.where('createdBy', '==', this.uid).get()
		const quizList = []
		data.forEach((doc) => quizList.push({ id: doc.id, data: doc.data() }))
		return quizList
	}

	deleteQuiz(id) {
		return this.ref.doc(id).delete()
	}

	async getAvailable() {
		const data = await this.ref.where('isPublic', '==', true).get()
		const quizList = []
		data.forEach((doc) => {
			const data = doc.data()
			if (data.createdBy !== this.uid) {
				quizList.push({ id: doc.id, data })
			}
		})
		return quizList
	}
}
export default new QuizService()
