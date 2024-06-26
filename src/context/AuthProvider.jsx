import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

//! Google auth provider
//! https://firebase.google.com/docs/auth/web/google-signin?hl=en&authuser=0
const googleProvider = new GoogleAuthProvider();

// const AuthProvider = (props) => {
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //! google popup
    const signInWithGoogle = () => {
        // setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        // setLoading(true);
        return signOut(auth);
    };

    //todo: observe auth state change
    //! https://react.dev/reference/react/useEffect#connecting-to-an-external-system
    useEffect(() => {
        //! https://firebase.google.com/docs/auth/web/manage-users?hl=en&authuser=0#get_the_currently_signed-in_user
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            console.log("observing current user inside useEffect of AuthProvider", currentUser);
            console.log("after setLoading loading = ", loading);
        });
        // console.log(typeof unSubscribe);
        console.log("unSubscribe...", unSubscribe);

        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        logOut,
    };
    // console.log(props.children);
    // console.log(children);

    return (
        <AuthContext.Provider value={authInfo}>
            {/* {props.children} */}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
};

//! https://react.dev/learn/passing-data-deeply-with-context

//! https://web.programming-hero.com/web-9/video/web-9-46-7-prop-drilling-to-pass-data-to-a-many-level-components

/***
 * 1. create context and export it
 * 2. set provider with value
 * 3. use the Auth Provider in the main.jsx file
 * 4. access children in the AuthProvider component as children and use it in the middle of the Provider
 */
