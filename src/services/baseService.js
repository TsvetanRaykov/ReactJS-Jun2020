import app from './firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'

class BaseService {
	constructor() {
		this.app = app
		this.auth = this.app.auth()
	}

	get uid() {
		return this.auth.currentUser.uid
	}
}

export default BaseService
