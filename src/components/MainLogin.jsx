import React from "react";
import SignUpForm from "./forms/SignUpForm";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import SignUpWithGoogle from "./forms/SignUpWithGoogle";
import SignInForm from "./forms/SignInForm";

function MainLogin() {
  return (
    <div className="p-2 flex flex-col w-full justify-between items-center gap-5 border">
      <div>
        <small className="text-xs">
          Create an account or sign in. By continuing, you agree to our{" "}
          <a href="#" className="text-green-600 underline">
            Terms of Use
          </a>{" "}
          and acknowledge our{" "}
          <a href="#" className="text-green-600 underline">
            Privacy Policy
          </a>
          .
        </small>
      </div>
      <div className="w-full">
        <SignUpWithGoogle />
      </div>
      <div className="text-xs flex items-center gap-5">
        <div>
          <TfiLayoutLineSolid />
        </div>
        or{" "}
        <div>
          <TfiLayoutLineSolid />
        </div>
      </div>
      <div className="w-full ">
        {/* <SignUpForm /> */}
        <SignInForm/>
      </div>
    </div>
  );
}

export default MainLogin;

// import React, { useState } from "react";
// import SignUpForm from "./forms/SignUpForm";
// import { TfiLayoutLineSolid } from "react-icons/tfi";
// import SignUpWithGoogle from "./header/SignUpWithGoogle";

// function MainLogin() {
//   const [isFormInProgress, setIsFormInProgress] = useState(false);

//   const handleFormStepChange = (step) => {
//     setIsFormInProgress(step > 1);
//   };

//   return (
//     <div className="p-2 flex flex-col w-full justify-between items-center gap-5">
//       {!isFormInProgress && (
//         <>
//           <div>
//             <small className="text-xs">
//               Create an account or sign in. By continuing, you agree to our{" "}
//               <a href="#" className="text-green-600 underline">Terms of Use</a> and
//               acknowledge our{" "}
//               <a href="#" className="text-green-600 underline">Privacy Policy</a>.
//             </small>
//           </div>
//           <div className="w-full">
//             <SignUpWithGoogle />
//           </div>
//           <div className="text-xs flex items-center gap-5">
//             <div>
//               <TfiLayoutLineSolid />
//             </div>
//             or{" "}
//             <div>
//               <TfiLayoutLineSolid />
//             </div>
//           </div>
//         </>
//       )}
//       <div className="w-full h-full">
//         <SignUpForm onStepChange={handleFormStepChange} />
//       </div>
//     </div>
//   );
// }

// export default MainLogin;
