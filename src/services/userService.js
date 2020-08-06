import app from './firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

class Firebase {
	constructor() {
		this.auth = app.auth()
		this.db = app.firestore()
		this.storage = app.storage()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	async logout() {
		await this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name,
		})
	}

	addImage(imageFile) {
		if (!this.auth.currentUser) {
			return alert('Not authorized')
		}
		const uploadTask = this.storage
			.ref(`/images/${imageFile.name}`)
			.put(imageFile)

		uploadTask.on(
			'state_changed',
			(snapShot) => {
				console.log(snapShot)
			},
			(err) => {
				console.error(err)
			},
			async () => {
				const photoURL = await this.storage
					.ref('images')
					.child(imageFile.name)
					.getDownloadURL()

				// await this.db.doc(`users_image/${this.auth.currentUser.uid}`).set({
				// 	imageUrl,
				// })
				await this.auth.currentUser.updateProfile({
					photoURL,
				})
			}
		)
	}

	getCurrentUserImage() {
		// if (!this.auth.currentUser) {
		// 	return ''
		// }
		// const data = await this.db
		// 	.doc(`users_image/${this.auth.currentUser.uid}`)
		// 	.get()

		// return data.get('imageUrl')
		return (this.auth.currentUser && this.auth.currentUser.photoURL) || '-'
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	getCurrentUserEmail() {
		return this.auth.currentUser && this.auth.currentUser.email
	}

	isInitialized() {
		return new Promise((resolve) => {
			this.auth.onAuthStateChanged(resolve)
		})
	}
}

export default new Firebase()
