import React, { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseProvider";

function GetPersonalInfo() {
  let [data, setData] = useState();
  let [url, setUrl] = useState(null);
  let { getUserInfo, getPdf } = useFirebase();

  useEffect(() => {
    getUserInfo().then((docs) => {
      console.log(docs.docs[0].data());
      setData(docs.docs[0].data());
    });
  }, []);

  useEffect(() => {
    if (data?.pdfURL) {
      getPdf(data.pdfURL).then((url) => {
        setUrl(url);
      }).catch((error) => {
        console.error("Error fetching PDF URL:", error);
      });
    }
  }, [data?.pdfURL]);

  console.log(data);
  return (
    <div>
      hiii
      <p>{data?.firstname}</p>
      <p>{data?.lastname}</p>
      <p>{data?.mobile}</p>
      <p>{data?.role}</p>
      <p>{data?.userEmail}</p>
      {url ? <a href={url} target="_blank" rel="noopener noreferrer">Download PDF</a> : 'Loading...'}
    </div>
  );
}

export default GetPersonalInfo;
