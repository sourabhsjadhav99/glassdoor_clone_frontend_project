import React from "react";
import Img from "../components/Img";
import salaries_bg from "../assets/salaries_bg.jpg";
import tablet from "../assets/tablet.webp";

// Define the SalariesPage component
function SalariesPage() {
  return (
    <div className="w-[100%] justify-center">
      <Img src={salaries_bg} className="w-[100vw] " />
      <p className="text-center">
        <span className="text-orange-600 font-semibold">NEW!</span>
        <span>
          Dive into anonymous, candid conversations with a community of
          professionals like you.{" "}
        </span>{" "}
        <span className="text-blue-600 font-semibold">
          Fishbowl by Glassdoor
        </span>
      </p>
      <div className="w-[100%] flex justify-center bg-white p-2 md:p-10">
        <div className="w-[100%] lg:w-[90%] p-5 flex flex-col lg:flex-row justify-between items-center border rounded-md shadow-md gap-5">
          <div className="w-[100%] md:w-[90%] lg:w-[50%] p-5">
            <h1 className="text-4xl font-bold mb-5">Even the Score</h1>
            <p className="">
              Whether you’re starting a job search or ready for a promotion, use
              Glassdoor to uncover what other professionals like you are getting
              paid – so you can negotiate with confidence.
            </p>{" "}
          </div>
          <div className="w-[100%] md:w-[90%] lg:w-[50%] float-right">
            <Img src={tablet} className="w-[100%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalariesPage;
