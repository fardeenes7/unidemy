"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";
// import NextNProgress from "nextjs-progressbar";

const TopLoadingBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar height="4px" color="#000" showOnShallow />
    </>
  );
};

export default TopLoadingBar;

// const TopLoadingBar = () => {
//   console.log("TopLoadingBar");
//   return <NextNProgress />;
// };

// export default TopLoadingBar;
