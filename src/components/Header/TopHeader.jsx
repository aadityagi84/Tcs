import React from "react";
import { Link, NavLink } from "react-router-dom";

const TopHeader = ({ data }) => {
  return (
    <div>
      <div className="flex items-center justify-between   ">
        <div className=""></div>
        <span className="top_header rounded-bl-[10px]">
          <ul className="xl:text-[16px] lg:text-[13px] md:text-[11px]  font-semibold  text-white hidden md:flex py-4 px-8 space-x-10">
            {data
              ? data.map((links, index) => {
                  return (
                    <Link to={links.url} key={index}>
                      <li>{links.name}</li>
                    </Link>
                  );
                })
              : ""}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default TopHeader;
