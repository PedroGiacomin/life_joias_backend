const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.API_KEY,  
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
}

firebase.initializeApp(firebaseConfig);

module.exports = {
  async createNewUser(email, password){
    try{
      const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

      return result.user.uid;

    }catch(error){
      console.warn(error);
    }
  }, 
  
  async login(email, password){
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return result.user.uid;
  }
};