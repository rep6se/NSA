// auth.js
import { auth, db } from './config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
    doc, 
    getDoc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * REGISTER FUNCTION
 */
export const registerUser = async (email, password, fullName, position) => {
    try {
        console.log("Attempting to register:", email);
        
        // 1. Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Save profile data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: fullName,
            email: email,
            position: position, // GK, DF, MF, FW
            role: "player", 
            createdAt: new Date().toISOString()
        });

        console.log("Registration successful for UID:", user.uid);
        return { uid: user.uid, name: fullName, role: "player", position: position };
    } catch (error) {
        console.error("Registration error:", error.code);
        let msg = "Failed to register.";
        if (error.code === 'auth/email-already-in-use') msg = "Email already in use.";
        if (error.code === 'auth/weak-password') msg = "Password is too weak.";
        throw new Error(msg);
    }
};

/**
 * LOGIN FUNCTION
 */
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
            return { uid: user.uid, ...userDoc.data() };
        } else {
            throw new Error("User profile not found in database.");
        }
    } catch (error) {
        let msg = "Login failed.";
        if (error.code === 'auth/user-not-found') msg = "User not found.";
        if (error.code === 'auth/wrong-password') msg = "Wrong password.";
        throw new Error(msg);
    }
};

export const logoutUser = () => signOut(auth);
