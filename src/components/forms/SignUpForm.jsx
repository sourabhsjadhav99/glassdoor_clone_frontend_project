// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import { signInvalidationSchema } from "../../utils/formValidation";
// import InputField from "../../components/InputField";
// import Button from "../../components/Button";
// import loader from "../../assets/Blocks.svg"
// import {
//   addDoc,
//   collection,
//   getDocs,
//   onSnapshot,
//   query,
// } from "firebase/firestore";
// import { db } from "../../firebase";

// function SignUpForm() {
//   let [users, setUsers] = useState([]);
//   let [formData, setFormData] = useState({});

//   let addUser = async (values) => {
//     try {
//       let docRef = await addDoc(collection(db, "user"), {
//         user: values,
//       });
//       alert("user added successufully", docRef.id);
//       console.log("user added successufully", docRef.id);
//     } catch (error) {
//       alert(error);
//       console.log("error", error);
//     }
//   };

//   let getAllUsers = async () => {
//     const querySnapshot = query(collection(db, "user"));
//     let users = onSnapshot(querySnapshot, (querySnapshot) => {
//       let userArray = [];
//       querySnapshot.forEach((doc) => {
//         userArray.push({ ...doc.data(), id: doc.id });
//       });
//       setUsers(userArray);
//     });
//   };

//   console.log(users);

//   // Check user credentials against the fetched users
//   const checkUserCredentials = () => {
//     getAllUsers();
//     for (let i = 0; i < users.length; i++) {
//       if (
//         users[i].email !== formData.email ||
//         users[i].password !== formData.password
//       ) {
//         alert("Invalid credentials");
//       } else {
//         alert("Logged in");
//         localStorage.setItem("user", JSON.stringify(users[i]));
//         return;
//       }
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     validationSchema: signInvalidationSchema,
//     onSubmit: (values) => {
//       console.log(values);
//       setFormData(values);
//       addUser(values);
//       // getAllUsers();
//       // checkUserCredentials();
//     },
//   });

//   return (
//     <div>

//       <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
//         <InputField
//           type="text"
//           name="email"
//           label="Enter Email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.errors.email}
//           touched={formik.touched.email}
//           className={"w-[100%] border-blue-500 border"}
//         />
//         <InputField
//           type="text"
//           name="password"
//           label="Enter Password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.errors.password}
//           touched={formik.touched.password}
//           className={"w-[100%] border-blue-500 border"}
//         />
//         <Button
//           type="submit"
//           className="w-[100%] bg-white text-black border border-black hover:bg-green-500 hover:text-white hover:border-0"
//         >
//           Continue With Email
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default SignUpForm;
//---------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import { signInvalidationSchema } from "../../utils/formValidation";
// import InputField from "../../components/InputField";
// import Button from "../../components/Button";
// import {
//   addDoc,
//   collection,
//   getDocs,
//   onSnapshot,
//   query,
// } from "firebase/firestore";
// import { db } from "../../firebase";

// function SignUpForm() {
// let [users, setUsers] = useState([]);
// let [formData, setFormData]=useState({})

// let addUser = async (values) => {
//   try {
//     let docRef = await addDoc(collection(db, "user"), {
//       user: values,
//     });
//     alert("user added successufully", docRef.id);
//     console.log("user added successufully", docRef.id);
//   } catch (error) {
//     alert(error);
//     console.log("error", error);
//   }
// };

// Define formik object with initial values, validation schema, and onSubmit function
// const formik = useFormik({
//   initialValues: {
//     email: "",
//   },
//   validationSchema: signInvalidationSchema,
//   onSubmit: (values) => {
//     console.log(values);
//     setFormData(values)
//     // addUser(values);
//     // getAllUsers();
//     checkUserCredentials()

//   },
// });

// let getAllUsers = async () => {
//   const querySnapshot = query(collection(db, "user"));
//   let users = onSnapshot(querySnapshot, (querySnapshot) => {
//     let userArray = [];
//     querySnapshot.forEach((doc) => {
//       userArray.push({ ...doc.data(), id: doc.id });
//     });
//     setUsers(userArray);
//   });
// };

// console.log(users)

// // Check user credentials against the fetched users
// const checkUserCredentials = () => {
//   getAllUsers();
//   for (let i = 0; i < users.length; i++) {
//     if (
//       users[i].email !== formData.email ||
//       users[i].password !== formData.password
//     ) {
//       alert("Invalid credentials");
//     } else {
//       alert("Logged in");
//       localStorage.setItem("user", JSON.stringify(users[i]));
//       return;
//     }
//   }
// };
//------------------------------------------------------------------------------------------------------
// src/SignIn.js
// File: src/components/SignUpForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import { signInvalidationSchema } from '../../utils/formValidation';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useFirebase } from '../../FirebaseProvider';

function SignUpForm() {
  const { signUpUser } = useFirebase();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInvalidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values;
      await signUpUser(email, password);
      resetForm(); // Reset the form after successful submission
    },
  });

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          type="email"
          name="email"
          label="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          className="w-full border-blue-500 border"
        />
        <InputField
          type="password"
          name="password"
          label="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          className="w-full border-blue-500 border"
        />
        <Button
          type="submit"
          className="w-full bg-white text-black border border-black hover:bg-green-500 hover:text-white hover:border-0"
        >
          Continue With Email
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
