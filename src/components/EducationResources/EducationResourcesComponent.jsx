import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
const tabs = ["2020 Resources", "2021 Resources", "2022 Resources"];

const dataByYear = {
  "2020 Resources": [
    {
      title: "2020: Intro to Immune System",
      presenter: "Dr. A. Sharma",
      affiliation: "PGIMER, Chandigarh",
    },
    {
      title: "2020: Immunology Basics",
      presenter: "Dr. B. Mehta",
      affiliation: "AIIMS, Delhi",
    },
    {
      title: "2020: Intro to Immune System",
      presenter: "Dr. A. Sharma",
      affiliation: "PGIMER, Chandigarh",
    },
    {
      title: "2020: Immunology Basics",
      presenter: "Dr. B. Mehta",
      affiliation: "AIIMS, Delhi",
    },
    {
      title: "2020: Intro to Immune System",
      presenter: "Dr. A. Sharma",
      affiliation: "PGIMER, Chandigarh",
    },
    {
      title: "2020: Immunology Basics",
      presenter: "Dr. B. Mehta",
      affiliation: "AIIMS, Delhi",
    },
  ],
  "2021 Resources": [
    {
      title: "2021: Immune Response Pathways",
      presenter: "Dr. Sunil K. Arora",
      affiliation: "PGIMER, Chandigarh",
    },
    {
      title: "2021: Cellular Immunity Explained",
      presenter: "Dr. R. Kapoor",
      affiliation: "NIMHANS, Bangalore",
    },
    {
      title: "2021: Immune Response Pathways",
      presenter: "Dr. Sunil K. Arora",
      affiliation: "PGIMER, Chandigarh",
    },
    {
      title: "2021: Cellular Immunity Explained",
      presenter: "Dr. R. Kapoor",
      affiliation: "NIMHANS, Bangalore",
    },
    {
      title: "2021: Immune Response Pathways",
      presenter: "Dr. Sunil K. Arora",
      affiliation: "PGIMER, Chandigarh",
    },
    {
      title: "2021: Cellular Immunity Explained",
      presenter: "Dr. R. Kapoor",
      affiliation: "NIMHANS, Bangalore",
    },
    {
      title: "2021: Immune Response Pathways",
      presenter: "Dr. Sunil K. Arora",
      affiliation: "PGIMER, Chandigarh",
    },
    {
      title: "2021: Cellular Immunity Explained",
      presenter: "Dr. R. Kapoor",
      affiliation: "NIMHANS, Bangalore",
    },
  ],
  "2022 Resources": [
    {
      title: "2022: New Vaccine Insights",
      presenter: "Dr. R. Khanna",
      affiliation: "THSTI, Faridabad",
    },
    {
      title: "2022: Cytokine Storm Case Study",
      presenter: "Dr. S. Iyer",
      affiliation: "CMC, Vellore",
    },
    {
      title: "2022: New Vaccine Insights",
      presenter: "Dr. R. Khanna",
      affiliation: "THSTI, Faridabad",
    },
    {
      title: "2022: Cytokine Storm Case Study",
      presenter: "Dr. S. Iyer",
      affiliation: "CMC, Vellore",
    },
    {
      title: "2022: New Vaccine Insights",
      presenter: "Dr. R. Khanna",
      affiliation: "THSTI, Faridabad",
    },
    {
      title: "2022: Cytokine Storm Case Study",
      presenter: "Dr. S. Iyer",
      affiliation: "CMC, Vellore",
    },
    {
      title: "2022: New Vaccine Insights",
      presenter: "Dr. R. Khanna",
      affiliation: "THSTI, Faridabad",
    },
    {
      title: "2022: Cytokine Storm Case Study",
      presenter: "Dr. S. Iyer",
      affiliation: "CMC, Vellore",
    },
  ],
};
const EducationResourcesComponent = () => {
  const [activeTab, setActiveTab] = useState("2020 Resources");
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    setResources(dataByYear[activeTab]);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    if (tab === activeTab) return;
    setLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setResources(dataByYear[tab]);
      setLoading(false);
    }, 1300);
  };

  return (
    <div className="p-6  mx-auto">
      {/* Tabs */}
      <div className="flex border-b mb-4 space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`pb-2 text-lg font-semibold ${
              tab === activeTab
                ? "border-b-4 border-blue-500 text-blue-600"
                : "text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tag */}
      <div className="relative mb-8 inline-block">
        <div className="bg-[#D4EBF8] text-black px-4 py-4 rounded-tr-[10px] rounded-bl-[10px] text-sm font-semibold flex items-center gap-2 shadow-sm">
          Immunology Lecture Series
          <span className="border-2 border-blue-500 text-blue-700 bg-white px-2 py-0.5 rounded-md text-xs font-bold">
            16
          </span>
        </div>
        <div className="absolute left-[40%] -bottom-3 w-6 h-6 bg-blue-100 rotate-45"></div>
      </div>

      {/* Loader or Content */}
      {loading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading content...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resources.map((res, index) => (
            <div key={index} className="bg-[#F6F6F6] p-4 rounded-xl shadow-sm">
              <p className="font-bold">{res.title}</p>
              <p className="font-bold">Presenter: {res.presenter}</p>
              <p className="font-bold">Affiliation: {res.affiliation}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-tr-[5px] rounded-bl-[5px]  flex items-center gap-2 hover:bg-blue-700 transition">
                View More <FaArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationResourcesComponent;
