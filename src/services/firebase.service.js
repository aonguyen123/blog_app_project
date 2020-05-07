import firebaseConfig from './../firebase';

const signInWithGoogle = () => {
    const provider = new firebaseConfig.firebase.auth.GoogleAuthProvider();
    return firebaseConfig.firebase.auth().signInWithPopup(provider);
};

export default {
    signInWithGoogle,
}
