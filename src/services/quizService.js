import app from './firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'

class UserService {
	constructor() {
		this.auth = app.auth()
		this.ref = app.firestore().collection('quizzes')
	}

	addQuiz(quiz) {
		quiz.createdBy = this.auth.currentUser.uid
		quiz.createdAt = new Date()
		return this.ref.add(quiz)
	}

	async getPersonal(userId) {
		const data = await this.ref.where('createdBy', '==', userId).get()
		const quizList = []
		data.forEach((doc) => quizList.push(doc.data()))
		return quizList
	}
}

export default new UserService()
