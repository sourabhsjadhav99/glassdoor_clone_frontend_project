// import { FcGoogle } from "react-icons/fc";
// import { useFirebase } from '../../FirebaseProvider';
// function SignUpWithGoogle() {
//   let { googleLogin } = useFirebase();

//   return (
//     <div className="w-full ">
//       <button
//         className="flex justify-between items-center border border-gray-500 p-2 px-5 w-full font-semibold rounded"
//         onClick={googleLogin}
//       >
//         <span className="text-2xl">
//           <FcGoogle />
//         </span>
//         <span className="w-[90%]">Continue with google</span>
//       </button>
//     </div>
//   );
// }

// export default SignUpWithGoogle;
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../redux/authSlice';

function SignUpWithGoogle() {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  return (
    <div className="w-full">
      <button
        className="flex justify-between items-center border border-gray-500 p-2 px-5 w-full font-semibold rounded"
        onClick={handleGoogleLogin}
      >
        <span className="text-2xl">
          <FcGoogle />
        </span>
        <span className="w-[90%]">Continue with Google</span>
      </button>
    </div>
  );
}

export default SignUpWithGoogle;
