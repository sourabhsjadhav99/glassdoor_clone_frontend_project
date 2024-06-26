import React from "react";
import styles from "./SkeletonLoader.module.css";

function DetailsCardSkeleton() {
  return (
    <div className="w-full bg-white ">
          <div className="w-[100%]  border rounded flex flex-col gap-2">
            <div className={`${styles.skeletonBox}  h-96`}></div>
            <div className={`${styles.skeletonBox}  h-10`}></div>
            <div className={`${styles.skeletonBox}  h-10`}></div>
            <div className={`${styles.skeletonBox}  h-10`}></div>
      </div>
    </div>
  );
}

export default DetailsCardSkeleton;
