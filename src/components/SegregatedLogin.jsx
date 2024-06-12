import React from "react";
import SignUpForm from "./forms/SignUpForm";
import { TfiLayoutLineSolid } from "react-icons/tfi";

function SegregatedLogin() {
  return (
    <div className="p-2 flex flex-col w-full justify-between items-center gap-5">
      <div>
        <small className="text-xs">
          Create an account or sign in. By continuing, you agree to our{" "}
          <a href="#" className="text-green-600 underline">Terms of Use</a> and
          acknowledge our{" "}
          <a href="#" className="text-green-600 underline">Privacy Policy</a>.
        </small>
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
      <div className="w-full h-full ">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SegregatedLogin;
