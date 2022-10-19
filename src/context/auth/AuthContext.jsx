import { createContext, useContext, useLayoutEffect, useState } from "react";
import { auth, db } from "../../firebase/Firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";



export const AuthContextProvider = createContext()

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState({})

    // sign Up *Create An Acc With Email&Password
    function Signup(email, password, username) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            userData: {
                name: username,
                email,
                password
            },
            savedShows: []
        })
    }

    // Sing In User With  Email&Password
    function SignIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign Out User
    function Signout(email, password) {
        return signOut(auth)
    }

    // is user valid
    useLayoutEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            Unsubscribe()
        };
    }, [])


    return (
        <AuthContextProvider.Provider value={{ user, Signout, SignIn, Signup }}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContextProvider)
}
