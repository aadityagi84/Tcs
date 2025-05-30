import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen border-4 border-red-4 flex items-center justify-center ">
      <PropagateLoader color="#0D3F78" />
    </div>
  );
};

export default Loader;
