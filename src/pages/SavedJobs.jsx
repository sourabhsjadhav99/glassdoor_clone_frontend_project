import React, { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseProvider";
import { useNavigate } from "react-router-dom";

function SavedJobs() {
  let [data, setData] = useState();
  let { getUserInfo } = useFirebase();
  let navigate = useNavigate();
  useEffect(() => {
    getUserInfo().then((docs) => {
      console.log(docs.docs[0].data().savedJobs);
      setData(docs.docs[0].data().savedJobs);
    });
  }, []);

  return (
    <div>
      <h1>Saved jobs</h1>
      {data?.map((job) => {
        return <div key={job.id}>
            <p>{job?.name}</p>

        </div>
      })}
    </div>
  );
}

export default SavedJobs;
