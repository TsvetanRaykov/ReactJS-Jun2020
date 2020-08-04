import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import firebaseConfig from './firebase-config'

class UserService {
	constructor() {
		app.initializeApp(firebaseConfig)
		this.auth = app.auth()
		this.ref = app.firestore().collection('quizzes')
	}

	async addQuiz(quiz) {
		return await this.ref.add(quiz)
	}
}

export default new UserService()
