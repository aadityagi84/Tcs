import React from "react";
import { Link } from "react-router-dom";

const AwardsComponent = ({
  title,
  points,
  membershipLinkText,
  membershipLink,
}) => {
  return (
    <div className="mb-10">
      <h3 className="lg:text-[22px]  text-[20px] font-bold mb-4">{title}</h3>
      <ul className="list-disc  pl-6 space-y-4 lg:text-[22px]">
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
      {membershipLinkText && (
        <div className="mt-4">
          <Link
            to={membershipLink}
            className="text-[#000] lg:text-[22px]  underline"
          >
            ( {membershipLinkText})
          </Link>
        </div>
      )}
    </div>
  );
};

export default AwardsComponent;
