import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Img from "../Img";
import spinner from "../../assets/spinner.svg"

function CompanyCard() {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const companyDetails = useSelector((state) => state.company.details);
  const loading = useSelector((state) => state.company.loading);
  const companyError = useSelector((state) => state.company.error);

  useEffect(() => {
    if (companyDetails !== null || companyError) {
      setSearchPerformed(true);
    }
  }, [companyDetails, companyError]);

  if (companyError) {
    return <p>Error: {companyError}</p>;
  }

  if (loading) {
    return <Img src={spinner}/>
  }

  if (searchPerformed && !companyDetails) {
    return <p>No company details available.</p>;
  }

  if (!companyDetails) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-2 border p-5 rounded border-gray-300">
      <div className="flex items-center gap-2">
        <Img
          src={companyDetails?.Images?.logo}
          alt={`${companyDetails?.name} logo`}
          className="w-[30px] h-[30px] rounded-full"
        />
        <h2 className="text-xl font-bold">{companyDetails?.name}</h2>
      </div>
      <p>
        <span className="text-lg font-bold">Description:</span> {companyDetails?.description}
      </p>
      <p>
        <span className="text-lg font-bold">Staff Count:</span> {companyDetails?.staffCount}
      </p>
      <p>
        <span className="text-lg font-bold">Type:</span> {companyDetails?.type}
      </p>
      <div>
        <span className="text-lg font-bold">Industries:</span>
        {companyDetails?.industries?.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
      </div>
      <div>
        <span className="text-lg font-bold">Specialities:</span>
        {companyDetails?.specialities?.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
      </div>
      <a href={companyDetails?.website} className="hover:underline text-blue-600">
        {companyDetails?.website}
      </a>
    </div>
  );
}

export default CompanyCard;
