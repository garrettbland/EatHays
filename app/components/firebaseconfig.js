import * as firebase from 'firebase';
const firebaseConfig = {
  databaseURL: "https://eathays-f5100.firebaseio.com/",
  apiKey: "AIzaSyDh69Xirp6_pYMrgLeLCe55IygInteXT_U",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp
