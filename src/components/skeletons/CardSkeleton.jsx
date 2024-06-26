import React from 'react'
import styles from "./SkeletonLoader.module.css";
function CardSkeleton() {
  return (
    <div className="w-full bg-white">
      <div className="flex justify-center p-2 lg:p-5">
        <div className="w-[100%] lg:w-[95%] xl:w-[90%] flex flex-col md:flex-row justify-center gap-10">
          <div className="w-[100%] flex-col flex gap-5">
            <div className={`${styles.skeletonBox} h-28`}></div>
            <div className={`${styles.skeletonBox} h-28`}></div>
            <div className={`${styles.skeletonBox} h-28`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton
