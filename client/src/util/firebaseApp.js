// @flow

import firebase from 'firebase';

const firebaseCongig = {
  apiKey: "AIzaSyBy7TfxbQsSeRUanBL6L_-IqWvzLXVkKzU",
  authDomain: "kicktube-87085.firebaseapp.com",
  databaseURL: "https://kicktube-87085.firebaseio.com",
  projectId: "kicktube-87085",
  storageBucket: "kicktube-87085.appspot.com",
  messagingSenderId: "1041672798109"
};

export default firebase.initializeApp(firebaseCongig);