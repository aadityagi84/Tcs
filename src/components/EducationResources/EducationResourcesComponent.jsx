import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  GetResourcePageList,
  GetResourcePageDetailsList,
} from "../../services/HomeService";
import Loader from "../Loader/Loader";

const EducationResourcesComponent = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [categoriesData, setCategoriesData] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [totalResourceCount, setTotalResourceCount] = useState(0);

  useEffect(() => {
    const fetchResourceCategories = async () => {
      try {
        const data = await GetResourcePageList();
        if (data && data.length > 0) {
          const yearTabs = data.map((item) => item.YearResource);
          setTabs(yearTabs);

          setActiveTab(yearTabs[0]);

          const categoriesMap = {};
          data.forEach((item) => {
            categoriesMap[item.YearResource] = item.CategoriesList;
          });
          setCategoriesData(categoriesMap);

          if (data[0].CategoriesList && data[0].CategoriesList.length > 0) {
            setActiveCategory(data[0].CategoriesList[0]);
            const totalCount = data.reduce((acc, year) => {
              return (
                acc +
                year.CategoriesList.reduce(
                  (yearAcc, cat) => yearAcc + cat.ResourceCount,
                  0
                )
              );
            }, 0);
            setTotalResourceCount(totalCount);
          }
        }
      } catch (error) {
        console.error("Error fetching resource categories:", error);
      }
    };

    fetchResourceCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchResourceDetails(activeCategory.Id);
    }
  }, [activeCategory]);

  const fetchResourceDetails = async (categoryId) => {
    try {
      setLoading(true);
      const { resources: resourceData } = await GetResourcePageDetailsList(
        1,
        10,
        categoryId
      );
      setResources(resourceData);
    } catch (error) {
      console.error("Error fetching resource details:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    if (tab === activeTab || !categoriesData[tab]) return;

    setLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      if (categoriesData[tab] && categoriesData[tab].length > 0) {
        setActiveCategory(categoriesData[tab][0]);
      }
      setLoading(false);
    }, 1300);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleViewMore = (resource) => {
    if (resource.FileUrl) {
      window.open(resource.FileUrl, "_blank");
    }
  };

  return (
    <div className="p-6 mx-auto">
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
      <div className="mb-8 flex flex-wrap gap-4 relative">
        {categoriesData[activeTab] && categoriesData[activeTab].length > 0 ? (
          <>
            {categoriesData[activeTab].map((category) => (
              <div key={category.Id} className="relative inline-block">
                <div
                  className={`text-black px-4 py-4 rounded-tr-[10px] rounded-bl-[10px] text-sm font-semibold flex items-center gap-2 shadow-sm cursor-pointer transition-colors ${
                    activeCategory && activeCategory.Id === category.Id
                      ? "bg-[#D4EBF8]"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.ResourceCategory}
                  <span className="border-2 border-blue-500 text-blue-700 bg-white px-2 py-0.5 rounded-md text-xs font-bold">
                    {category.ResourceCount}
                  </span>
                </div>
                <div className="absolute left-[40%] -bottom-3 w-6 h-6 bg-blue-100 rotate-45"></div>
              </div>
            ))}

            {/* Show "No Data Found" if all ResourceCount are 0 */}
            {activeCategory.ResourceCount === 0 ? (
              <div className="w-full flex justify-center mt-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700 px-6 py-4 rounded-xl">
                  No Data Found
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <div className="relative inline-block">
            <div className="bg-gray-200 text-gray-600 px-4 py-4 rounded-tr-[10px] rounded-bl-[10px] text-sm font-semibold flex items-center gap-2 shadow-sm">
              No Data Found
              <span className="border-2 border-gray-400 text-gray-600 bg-white px-2 py-0.5 rounded-md text-xs font-bold">
                0
              </span>
            </div>
            <div className="absolute left-[40%] -bottom-3 w-6 h-6 bg-gray-200 rotate-45"></div>
          </div>
        )}
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
              <p className="font-bold">{res.TitleOftheTalk}</p>
              <p className="font-bold">Presenter: {res.PresenterName}</p>
              <p className="font-bold">Affiliation: {res.Affiliation}</p>
              <button
                onClick={() => handleViewMore(res)}
                className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-tr-[5px] rounded-bl-[5px] flex items-center gap-2 hover:bg-blue-700 transition"
              >
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
