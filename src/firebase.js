import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyB6RgJVHmvBf4IuwIk8d8C-FNZwV9OaD-k",
  authDomain: "calorie-tracker-52b32.firebaseapp.com",
  databaseURL: "https://calorie-tracker-52b32.firebaseio.com",
  projectId: "calorie-tracker-52b32",
  storageBucket: "calorie-tracker-52b32.appspot.com",
  messagingSenderId: "624848596581"
};

export const firebaseApp = firebase.initializeApp(config);
