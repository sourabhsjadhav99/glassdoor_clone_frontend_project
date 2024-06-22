import React from "react";
import PersonalInfo from "../components/PersonalInfo";
import { useNavigate } from "react-router-dom";

function GetPersonalInfo() {
  // useNavigate hook for programmatic navigation
  let navigate = useNavigate();
  return (
    // Main container for the component
    <div className="w-[100%] md:min-h-[90vh] flex  justify-center  bg-white p-10">
      <div className="w-[100%] md:w-[60%] lg:w-[40%] flex flex-col gap-5">
        <div>
          <PersonalInfo />
        </div>
        <div className="flex border border-gray-300 rounded p-5 justify-around">
          <div>
            <button
              onClick={() => navigate("/savedjobs")}
              className="border border-gray-300  rounded p-2 hover:bg-blue-200 bg-green-200 hover:font-semibold"
            >
              Saved jobs
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/savedjobs")}
              className="border border-gray-300  rounded p-2 hover:bg-blue-200 bg-green-200 hover:font-semibold"
            >
              Applied jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetPersonalInfo;
