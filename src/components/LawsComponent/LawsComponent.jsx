import React from "react";

const LawsComponent = ({ number, rules }) => {
  return (
    <div className="pt-4">
      {/* <h3 className="lg:text-[22px]  text-[20px] font-bold mb-4">{title}</h3> */}
      <ol className="  space-y-4 lg:text-[22px] md:text-[18px]">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="grid lg:grid-cols-[50px,1fr] grid-cols-[30px,1fr] gap-2"
          >
            <span>{rule.number}.</span>
            <li>
              <p>{rule.text}</p>
              {rule.subpoints && (
                <ul className="[list-style-type:lower-alpha] pl-6 lg:text-[22px] md:text-[18px]   spacey-y-4 mt-1">
                  {rule.subpoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default LawsComponent;
