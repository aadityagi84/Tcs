import { FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";

const AwardList = ({ title, file }) => {
  return (
    <Link to={file} target="_blank">
      <div className="flex mt-4 items-center gap-4 font-bold text-[#1D1E1C] lg:text-[18px] border-b py-4 border-[#1560BD]  border-dashed ">
        <div className="">
          <FaFilePdf className="text-red-600 text-[28px]" />
        </div>
        <div className="">{title}</div>
      </div>
    </Link>
  );
};

export default AwardList;
