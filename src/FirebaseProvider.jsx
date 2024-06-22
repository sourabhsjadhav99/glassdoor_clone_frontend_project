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
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Effect hook to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
        setUserEmail(user.email);
        setUserId(user.uid);
      } else {
        setUser(null);
        setUserEmail(null);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to fetch user data based on user ID
  const fetchUserData = async (uid) => {
    setLoading(true);
    try {
      const userDocQuery = query(
        collection(db, "userInfo"),
        where("userId", "==", uid)
      );
      const querySnapshot = await getDocs(userDocQuery);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setUserData(data);
        setLoading(false);
      } else {
        console.log("No such user data!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error);
    }
  };

  // Function to sign up a new user
  const signUpUser = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Successfully signed up");
      navigate("/");
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during sign up:", error);
    }
  };

  // Function to sign in an existing user
  const signInUser = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Successfully signed in");
      navigate("/");
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during sign in:", error);
    }
  };

  // Function to sign in with Google
  const googleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success("Successfully signed in");
      navigate("/");
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during Google sign-in:", error);
    }
  };

  // Function to log out the current user
  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out");
      setUser(null);
      setUserEmail(null);
      setUserId(null);
      setUserData(null);
      navigate("/signup");
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during sign-out:", error);
    }
  };

  // Function to get user information from Firestore
  const getUserInfo = () => {
    try {
      return getDocs(collection(db, "userInfo"));
    } catch (error) {
      console.error("Error during fetching user info:", error);
    }
  };

  // Function to get PDF file from Firebase Storage
  const getPdf = async (path) => {
    try {
      return await getDownloadURL(ref(storage, path));
    } catch (error) {
      console.error("Error getting PDF URL:", error);
      throw error;
    }
  };

  // Check if user is logged in
  let isLoggedIn = user ? true : false;

  // Function to upload user information to Firestore and Firebase Storage
  const uploadUserInfo = async (firstname, lastname, mobile, role, pdfFile) => {
    try {
      const pdfRef = ref(storage, `upload/pdf/${Date.now()}-${pdfFile.name}`);
      const uploadResult = await uploadBytes(pdfRef, pdfFile);
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
        savedJobs: [],
        appliedJobs: [],
      });
      await fetchUserData(user.uid);
      toast.success("User information uploaded successfully");
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error during user info upload:", error);
    }
  };

  // Function to update user information in Firestore
  const updateUserInfo = async (newData) => {
    try {
      const userDocQuery = query(
        collection(db, "userInfo"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(userDocQuery);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref; // Get reference to the user's document
        await updateDoc(docRef, newData);
        await fetchUserData(user.uid); // Refresh the user data
        toast.success("User information updated successfully");
      } else {
        console.log("No such user data to update!");
      }
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error updating user data:", error);
    }
  };

  // Function to update saved jobs in user data
  const updateSavedJobs = async (newData) => {
    try {
      const userDocQuery = query(
        collection(db, "userInfo"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(userDocQuery);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref; // Get reference to the user's document
        await updateDoc(docRef, newData);
        await fetchUserData(user.uid); // Refresh the user data
      } else {
        console.log("No such user data to update!");
      }
    } catch (error) {
      toast.error(`${error.message}`);
      console.error("Error updating saved jobs:", error);
    }
  };

  // Provide Firebase functionality and state through context
  return (
    <FirebaseContext.Provider
      value={{
        signUpUser,
        signInUser,
        googleLogin,
        userData, // Provide user data to the context
        logOut,
        isLoggedIn,
        uploadUserInfo,
        getUserInfo,
        getPdf,
        updateUserInfo,
        userEmail,
        updateSavedJobs,
        loading,
        error,
      }}
    >
      {/* Display toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
