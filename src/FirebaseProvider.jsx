// // File: src/FirebaseProvider.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth, db, storage } from "./firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

// const FirebaseContext = createContext(null);

// export const FirebaseProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState();
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//   }, []);

//   let isLoggedIn = user ? true : false;

//   const signUpUser = async (email, password) => {
//     try {
//       const userCredentials = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log("User created:", userCredentials);
//       alert("User created");
//       navigate("/jobs");
//     } catch (error) {
//       console.error("Error during sign up:", error);
//       alert(`Operation failed: ${error.code} ${error.message}`);
//     }
//   };

//   const signInUser = async (email, password) => {
//     try {
//       const userCredentials = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log("User signed in:", userCredentials);
//       alert("User signed in");
//       navigate("/jobs");
//     } catch (error) {
//       console.error("Error during sign in:", error);
//       alert(`Operation failed: ${error.code} ${error.message}`);
//     }
//   };

//   const googleLogin = async () => {
//     const googleProvider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       alert("User signed in");
//       navigate("/jobs");
//       console.log(result);
//       // Additional actions upon successful login can be added here
//     } catch (error) {
//       console.error("Error during Google sign-in:", error);
//       // Handle the error appropriately, e.g., show a message to the user
//     }
//   };
//   console.log(user?.id)

//   const logOut = async () => {
//     try {
//       await signOut(auth);
//       console.log("User logged out");
//       alert("User logged out");
//       navigate("/signup");
//       // Additional actions upon successful logout can be added here
//     } catch (error) {
//       console.error("Error during sign-out:", error);
//       // Handle the error appropriately, e.g., show a message to the user
//     }
//   };

//   const uploadUserInfo = async (firstname, lastname, mobile, role, pdfFile) => {
//     try {
//       let pdfRef = ref(storage, `upload/pdf/${Date.now()}-${pdfFile.name}`);
//       let uploadResult = await uploadBytes(pdfRef, pdfFile);
//       await addDoc(collection(db, "userInfo"), {
//         firstname,
//         lastname,
//         mobile,
//         role,
//         pdfURL: uploadResult.ref.fullPath,
//         userId: user.uid,
//         userEmail: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         savedJobs:[{id:1, name:"frontend"}, {id:2, name:"backend"}, {id:3, name:"fullstack"}]
//       });
//     } catch (error) {
//       console.error("Error during sign-out:", error);
//     }
//   };

//   const getUserInfo = () => {
//     try {
//       return getDocs(collection(db, "userInfo"));
//     } catch (error) {
//       console.error("Error during sign-out:", error);
//     }
//   };

//   // const getUserInfo =async (id) => {
//   //   try {
//   //    let docRef= doc(db, "userInfo", "kvy83yircBGtPSPhST13")
//   //    let result = await getDoc(docRef)
//   //    return result

//   //   } catch (error) {
//   //     console.error("Error during sign-out:", error);
//   //   }
//   // };

//   const getPdf = async (path) => {
//     try {
//       return await getDownloadURL(ref(storage, path));
//     } catch (error) {
//       console.error("Error getting PDF URL:", error);
//       throw error;
//     }
//   };
//   return (
//     <FirebaseContext.Provider
//       value={{
//         signUpUser,
//         signInUser,
//         googleLogin,
//         user,
//         logOut,
//         isLoggedIn,
//         uploadUserInfo,
//         getUserInfo,
//         getPdf
//       }}
//     >
//       {children}
//     </FirebaseContext.Provider>
//   );
// };

// export const useFirebase = () => useContext(FirebaseContext);
//--------------------------------------------------------------------

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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { update } from "firebase/database";

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
        setUserEmail(user.email);
      } else {
        setUser(null);
        setUserData(null);
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDocQuery = query(
        collection(db, "userInfo"),
        where("userId", "==", uid)
      );
      const querySnapshot = await getDocs(userDocQuery);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setUserData(data);
      } else {
        console.log("No such user data!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(user);
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
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      alert("User logged out");
      navigate("/signup");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };
  const getUserInfo = () => {
    try {
      return getDocs(collection(db, "userInfo"));
    } catch (error) {
      console.error("Error during fetching user info:", error);
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
  let isLoggedIn = user ? true : false;

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
        savedJobs: [
          { id: 1, name: "frontend" },
          { id: 2, name: "backend" },
          { id: 3, name: "fullstack" },
        ],
      });
      await fetchUserData(user.uid);
      alert("User information uploaded successfully");
    } catch (error) {
      console.error("Error during user info upload:", error);
    }
  };

  // const updateUserInfo = async (newData) => {
  //   try {
  //     const userDocQuery = query(
  //       collection(db, "userInfo"),
  //       where("userId", "==", user.uid)
  //     );
  //     const querySnapshot = await getDocs(userDocQuery);
  //     if (!querySnapshot.empty) {
  //       const docRef = querySnapshot.docs[0].ref; // Get reference to the user's document
  //       await updateDoc(docRef, newData);
  //       await fetchUserData(user.uid); // Refresh the user data
  //       alert("User information updated successfully");
  //     } else {
  //       console.log("No such user data to update!");
  //     }
  //   } catch (error) {
  //     console.error("Error updating user data:", error);
  //     alert(`Error updating user data: ${error.message}`);
  //   }
  // };

  // const updateUserInfo = async (updatedData) => {
  //   try {
  //     const docRef = doc(collection(db, "userInfo"), user.uid);
  //     await update(docRef, updatedData);
  //     console.log("Document in", "userInfo", "updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating document:", error);
  //   }
  // };
  const updateUserInfo = async (updatedData, userId) => {
    try {
      const docRef = doc(collection(db, "userInfo"), userId);
      await updateDoc(docRef, updatedData);
      console.log("Document in 'userInfo' updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

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
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);

//--------------------------------------------
// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth, db, storage } from "./firebase";
// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytes,
// } from "firebase/storage";
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   setDoc,
//   updateDoc,
//   where,
// } from "firebase/firestore";

// const FirebaseContext = createContext(null);

// export const FirebaseProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//         fetchUserData(user.uid);
//       } else {
//         setUser(null);
//         setUserData(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchUserData = async (uid) => {
//     try {
//       const userDocQuery = query(collection(db, "userInfo"), where("userId", "==", uid));
//       const querySnapshot = await getDocs(userDocQuery);
//       if (!querySnapshot.empty) {
//         const data = querySnapshot.docs[0].data();
//         setUserData(data);
//       } else {
//         console.log("No such user data!");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const signUpUser = async (email, password) => {
//     try {
//       const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
//       console.log("User created:", userCredentials);
//       alert("User created");
//       navigate("/jobs");
//     } catch (error) {
//       console.error("Error during sign up:", error);
//       alert(`Operation failed: ${error.code} ${error.message}`);
//     }
//   };

//   const signInUser = async (email, password) => {
//     try {
//       const userCredentials = await signInWithEmailAndPassword(auth, email, password);
//       console.log("User signed in:", userCredentials);
//       alert("User signed in");
//     } catch (error) {
//       console.error("Error during sign in:", error);
//       alert(`Operation failed: ${error.code} ${error.message}`);
//     }
//   };

//   const googleLogin = async () => {
//     const googleProvider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       alert("User signed in");
//       navigate("/jobs");
//       console.log(result);
//     } catch (error) {
//       console.error("Error during Google sign-in:", error);
//     }
//   };

//   const logOut = async () => {
//     try {
//       await signOut(auth);
//       console.log("User logged out");
//       alert("User logged out");
//       navigate("/signup");
//     } catch (error) {
//       console.error("Error during sign-out:", error);
//     }
//   };

//   const uploadUserInfo = async (firstname, lastname, mobile, role, pdfFile) => {
//     try {
//       let pdfURL = "";
//       if (pdfFile) {
//         const pdfRef = ref(storage, `upload/pdf/${Date.now()}-${pdfFile.name}`);
//         const uploadResult = await uploadBytes(pdfRef, pdfFile);
//         pdfURL = uploadResult.ref.fullPath;
//       }
//       await addDoc(collection(db, "userInfo"), {
//         firstname,
//         lastname,
//         mobile,
//         role,
//         pdfURL,
//         userId: user.uid,
//         userEmail: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         savedJobs: [
//           { id: 1, name: "frontend" },
//           { id: 2, name: "backend" },
//           { id: 3, name: "fullstack" },
//         ],
//       });
//       await fetchUserData(user.uid);
//       alert("User information uploaded successfully");
//     } catch (error) {
//       console.error("Error during user info upload:", error);
//     }
//   };

//   const updateUserInfo = async (newData) => {
//     try {
//       const userDocQuery = query(collection(db, "userInfo"), where("userId", "==", user.uid));
//       const querySnapshot = await getDocs(userDocQuery);
//       if (!querySnapshot.empty) {
//         const docRef = querySnapshot.docs[0].ref;
//         await updateDoc(docRef, newData);
//         await fetchUserData(user.uid);
//         alert("User information updated successfully");
//       } else {
//         console.log("No such user data to update!");
//       }
//     } catch (error) {
//       console.error("Error updating user data:", error);
//       alert(`Error updating user data: ${error.message}`);
//     }
//   };

//   return (
//     <FirebaseContext.Provider
//       value={{
//         signUpUser,
//         signInUser,
//         googleLogin,
//         userData,
//         user,
//         logOut,
//         uploadUserInfo,
//         updateUserInfo,
//       }}
//     >
//       {children}
//     </FirebaseContext.Provider>
//   );
// };

// export const useFirebase = () => useContext(FirebaseContext);
