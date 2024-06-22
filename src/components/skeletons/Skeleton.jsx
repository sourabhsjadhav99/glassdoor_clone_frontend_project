import React from "react";
import styles from "./SkeletonLoader.module.css";

function SkeletonLoader() {
  return (
    <div className="w-full bg-white">
      <div className="flex justify-center p-2 lg:p-5">
        <div className="w-[100%] lg:w-[95%] xl:w-[90%] flex flex-col md:flex-row justify-center gap-10">
          <div className="w-[100%] md:w-[40%] flex-col flex gap-5">
            <div className={`${styles.skeletonBox} h-28`}></div>
            <div className={`${styles.skeletonBox} h-28`}></div>
            <div className={`${styles.skeletonBox} h-28`}></div>
          </div>
          <div className="w-[100%] md:w-[60%] border rounded flex flex-col gap-2">
            <div className={`${styles.skeletonBox}  h-96`}></div>
            <div className={`${styles.skeletonBox}  h-10`}></div>
            <div className={`${styles.skeletonBox}  h-10`}></div>
            <div className={`${styles.skeletonBox}  h-10`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
