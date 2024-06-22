import React, { useEffect } from "react";
import MainLogin from "../components/MainLogin";
import { TiMessages } from "react-icons/ti";
import { PiNotepadBold, PiBuildingOffice, PiMoneyBold } from "react-icons/pi";

import signMob from "../assets/sign_mob.png";
import Img from "../components/Img";
import signupimg1 from "../assets/sign1.png";
import signupimg2 from "../assets/sign2.png";
import { useFirebase } from "../FirebaseProvider";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  // Destructure isLoggedIn from the useFirebase hook
  let { isLoggedIn } = useFirebase();

  // Get navigate function from useNavigate hook
  let navigate = useNavigate();

  // useEffect hook to redirect user if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div
        className={` flex flex-col justify-center items-center py-5 bg-white gap-5`}
      >
        <div className="lg:hidden block w-full text-center">
          <Img src={signMob} alt="" className="w-[100%] " />
        </div>
        <div className="w-full text-center">
          <h1 className="text-2xl md:text-5xl font-semibold text-green-600">
            Your work people are here
          </h1>
        </div>
        <div className="flex w-[100%] lg:w-[80%] justify-center lg:justify-between items-center ">
          <div className="hidden lg:block w-1/3  text-center">
            <Img src={signupimg1} alt="" className={`w-[100%] `} />
          </div>
          <div className="w-full md:w-[60%] lg:w-[40%] xl:w-1/3 flex justify-center text-center">
            <MainLogin />
          </div>
          <div className="hidden lg:block w-1/3 text-center  ">
            <Img src={signupimg2} alt="" className={`w-[100%] `} />
          </div>
        </div>
        <div className="bg-gray-100 w-full flex justify-center p-2 md:p-5">
          <div className="w-full md:w-[80%] lg:w-[65%]  xl:w-[50%] flex flex-col items-center  gap-5">
            <h1 className="text-xl md:text-2xl text-center">
              Find out what's new at Glassdoor
            </h1>
            <div className="w-full flex justify-center">
              <iframe
                className="w-full md:w-[80%] h-[250px] md:h-[350px]"
                src="https://www.youtube.com/embed/g539bZIDh_A"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="w-[80%]">
              Your career journey is serious, but should never be lonely or
              dull. With the new Glassdoor, work communities are right at your
              fingertips.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-[100%] gap-5 p-5">
          <h1 className="text-2xl font-semibold ">Get ahead with Glassdoor</h1>
          <p className="w-full md:w-[70%] lg:w-[50%] xl:w-[30%] text-center">
            We're serving up trusted insights and anonymous conversation, so
            you'll have the goods you need to succeed.
          </p>
          <div className=" w-[100%] grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className=" flex flex-col items-center">
              <div className="border-2 border-black p-3 rounded-full">
                {" "}
                <TiMessages className="text-3xl" />
              </div>
              <p className=" text-center">Join your work community</p>
            </div>
            <div className=" flex flex-col items-center">
              <div className="border-2 border-black p-3 rounded-full">
                {" "}
                <PiNotepadBold className="text-3xl" />
              </div>
              <p className=" text-center">Join your work community</p>
            </div>
            <div className=" flex flex-col items-center">
              <div className="border-2 border-black p-3 rounded-full">
                {" "}
                <PiBuildingOffice className="text-3xl" />
              </div>
              <p className=" text-center">Join your work community</p>
            </div>
            <div className=" flex flex-col items-center">
              <div className="border-2 border-black p-3 rounded-full">
                {" "}
                <PiMoneyBold className="text-3xl" />
              </div>
              <p className=" text-center">Join your work community</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
