// File: src/FirebaseProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  let isLoggedIn = user ? true : false;

  const signUpUser = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredentials);
      alert("User created");
      navigate("/jobs");
    } catch (error) {
      console.error("Error during sign up:", error);
      alert(`Operation failed: ${error.code} ${error.message}`);
    }
  };

  const signInUser = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredentials);
      alert("User signed in");
      navigate("/jobs");
    } catch (error) {
      console.error("Error during sign in:", error);
      alert(`Operation failed: ${error.code} ${error.message}`);
    }
  };

  const googleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert("User signed in");
      navigate("/jobs");
      console.log(result);
      // Additional actions upon successful login can be added here
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      // Handle the error appropriately, e.g., show a message to the user
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      alert("User logged out");
      navigate("/signup");
      // Additional actions upon successful logout can be added here
    } catch (error) {
      console.error("Error during sign-out:", error);
      // Handle the error appropriately, e.g., show a message to the user
    }
  };

  console.log(user);
  const uploadUserInfo = async (firstname, lastname, mobile, role, pdfFile) => {
    try {
      let pdfRef = ref(storage, `upload/pdf/${Date.now()}-${pdfFile.name}`);
      let uploadResult = await uploadBytes(pdfRef, pdfFile);
      await addDoc(collection(db, "userInfo"), {
        firstname,
        lastname,
        mobile,
        role,
        pdfURL: uploadResult.ref.fullPath,
        userId: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const getUserInfo = () => {
    try {
      return getDocs(collection(db, "userInfo"));
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };


  const getPdf = async (path) => {
    try {
      return await getDownloadURL(ref(storage, path));
    } catch (error) {
      console.error("Error getting PDF URL:", error);
      throw error;
    }
  };
  return (
    <FirebaseContext.Provider
      value={{
        signUpUser,
        signInUser,
        googleLogin,
        user,
        logOut,
        isLoggedIn,
        uploadUserInfo,
        getUserInfo,
        getPdf
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
