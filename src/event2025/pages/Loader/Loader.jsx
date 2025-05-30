import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color="#1560BD" size={50} />
    </div>
  );
};

export default Loader;
