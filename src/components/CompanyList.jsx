import { useSelector } from "react-redux";
import CompanyCard from "./cards/CompanyCard";


const CompanyList = () => {
  // Accessing the jobState from Redux store using useSelector
  const jobState = useSelector((state) => state.jobs);

  return (
    <div className="bg-white">
      {jobState.error && <p>Error: {jobState.error}</p>}
      {jobState?.data.length > 0  && <div className="job-list">
        {jobState?.data.length > 0 ? (
          jobState?.data?.map((job, index) => (
            <CompanyCard key={job?.job_id} job={job} />
          ))
        ) : (
          <div className="text-xl">Sorry! results not found</div>
        )}
      </div>}
    </div>
  );
};

export default CompanyList;
