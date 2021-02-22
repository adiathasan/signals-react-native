import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCP1munJZsAGJYfkaXEikRh4Ju1FMCv_-0',
	authDomain: 'signal-man.firebaseapp.com',
	projectId: 'signal-man',
	storageBucket: 'signal-man.appspot.com',
	messagingSenderId: '491830822781',
	appId: '1:491830822781:web:cf1dc7622dfc7c2a88ee14',
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

export const db = app.firestore();

export const auth = app.auth();

export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
