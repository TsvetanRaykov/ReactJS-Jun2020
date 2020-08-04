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
}

export default new UserService()
