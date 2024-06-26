import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { fetchJobs } from "../../redux/jobsSlice";
import { useNavigate } from "react-router-dom";

const HeaderSearchForm = ({
  setShowSearch,
  showSearch,
  toggleForm,
  isMobile,
}) => {
  let navigate = useNavigate();
  const [keywords, setKeywords] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (keywords.trim()) {
        dispatch(
          fetchJobs({
            keywords,
            datePosted: "anyTime",
            sort: "mostRelevant",
          })
        );
        if (isMobile === true) {
          setShowSearch(!showSearch);
          toggleForm();
        }
        navigate("/");
      }
    },
    [dispatch, keywords]
  );

  return (
    <div className="w-[100%]">
      <form
        onSubmit={handleSubmit}
        className="w-[100%] flex gap-1 justify-center"
      >
        <div className="w-[100%] flex items-center justify-evenly bg-gray-100 rounded-full">
          <div className="px-2">
            <IoMdSearch className="text-2xl text-gray-500" />
          </div>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-[100%] md:w-[95%] p-1 bg-gray-100  mtext-md  outline-none rounded-full"
            placeholder="Find the perfect job"
          />
        </div>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default HeaderSearchForm;
