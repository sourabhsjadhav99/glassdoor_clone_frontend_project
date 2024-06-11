import React from "react";
import companyImg from "../assets/companies.webp";

function CompaniesPage() {
  return (
    <div className="w-full">
      <div className="w-full bg-green-50 flex justify-center py-10">
        <div className="w-full xl:w-[70%] lg:[85%] flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="w-full lg:w-1/2 ">
            <img src={companyImg} alt="" className="w-[100%] h-[100%]" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="">
              <h1 className="text-2xl font-bold">
                Find a workplace that works for you{" "}
                <small className="bg-green-200 text-xs p-1 font-bold ">
                  NEW
                </small>
              </h1>
            </div>
            <div>
              <p className="text-[#20262e]">
                Discover what an employer is really like before you make your
                next move. Search reviews and ratings, and filter companies
                based on the qualities that matter most to your job search.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-white border text-[#20262e]  rounded  p-2 text-md font-bold">
                Work/Life Balance
              </button>
              <button className="bg-white border text-[#20262e]  rounded  p-2 text-md font-bold">
                Diversity and inclusion
              </button>
              <button className="bg-white border text-[#20262e]  rounded  p-2 text-md font-bold">
                Compensation and Benifits
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col   lg:flex-row justify-center items-center bg-white p-10 border-b-2 gap-2">
        <p>Have an employer in mind?</p>
        <div className="min-w-[30%] flex gap-2">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search a Company"
              className="border rounded p-2 text-lg w-full"
            />
          </div>
          <button className="p-2 bg-blue-600 text-white rounded font-semibold">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompaniesPage;
