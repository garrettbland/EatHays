import * as firebase from 'firebase';
const firebaseConfig = {
  databaseURL: "https://eathays-f5100.firebaseio.com/",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp
