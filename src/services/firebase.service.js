import firebaseConfig from './../firebase';

const signInWithGoogle = () => {
    const provider = new firebaseConfig.firebase.auth.GoogleAuthProvider();
    return firebaseConfig.firebase.auth().signInWithPopup(provider);
};
const signinLocal = (email, password) => {
    return firebaseConfig.firebase.auth().signInWithEmailAndPassword(email, password);
}
const signupLocal = (email, password) => {
    return firebaseConfig.firebase.auth().createUserWithEmailAndPassword(email, password);
}

export default {
    signInWithGoogle,
    signinLocal,
    signupLocal
}
