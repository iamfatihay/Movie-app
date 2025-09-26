import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import {
    toastErrorNotify,
    toastSuccessNotify,
    toastWarnNotify,
} from "../helpers/ToastNotify";

//* Your web app's Firebase configuration
// TODO: Replace the following with your app's Firebase project configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! Get firebase config settings from firebase console settings section
const firebaseConfig = {
    apiKey: "AIzaSyDc1vL8xsSyesCmAs7GJihoMlkEWUtwyBA",
    authDomain: "movie-app-9c6b3.firebaseapp.com",
    projectId: "movie-app-9c6b3",
    storageBucket: "movie-app-9c6b3.appspot.com",
    messagingSenderId: "110832041696",
    appId: "1:110832041696:web:8126fc8b6c3f78ce799a85",
    measurementId: "G-QM8VB9WJ9R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const createUser = async (email, password, navigate, displayName) => {
    //? Firebase method used to create a new user
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        //? Firebase method used to update user profile
        await updateProfile(auth.currentUser, {
            displayName: displayName,
        });
        navigate("/");
        toastSuccessNotify("Registered successfully!");
        console.log(userCredential);
    } catch (error) {
        toastErrorNotify(error.message);
        // alert(error.message);
    }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Enable Email/password sign-in
export const signIn = async (email, password, navigate) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        toastSuccessNotify("Logged in successfully!");
    } catch (error) {
        toastErrorNotify(error.message);
        // alert(error.message);
    }
};

export const userObserver = (setCurrentUser) => {
    //? Firebase method that tracks whether user is signed in and returns new user as response when user changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const { email, displayName, photoURL } = user;
            setCurrentUser({ email, displayName, photoURL });
            console.log(user);
        } else {
            setCurrentUser(false);
            console.log("user signed out");
        }
    });
};

export const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully!");
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Enable Google sign-in
//* => Authentication => settings => Authorized domains => add domain
//! After deploying the project, add the deploy link to the domain list for Google sign-in to work
export const signUpWithGoogle = (navigate) => {
    const provider = new GoogleAuthProvider();
    //? Firebase method used for sign-in with popup window
    signInWithPopup(auth, provider)
        .then((result) => {
            // console.log(result);
            navigate("/");
            toastSuccessNotify("Logged in successfully!");
        })
        .catch((error) => {
            // Handle Errors here.
            console.log(error);
        });
};

export const forgotPassword = (email) => {
    //? Firebase method used for password reset via email
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            toastWarnNotify("Please check your mail box!");
            // alert("Please check your mail box!");
        })
        .catch((err) => {
            toastErrorNotify(err.message);
            // alert(err.message);
            // ..
        });
};
