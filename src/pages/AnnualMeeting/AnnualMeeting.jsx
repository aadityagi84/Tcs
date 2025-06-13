import React, { useState, useEffect } from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import AnnualMeetingComponent from "../../Components/AnnualMeeting/AnnualMeeting";
import Footer from "../../Components/footer/Footer";
import { GetAnnualMeetingPageList } from "../../services/HomeService";
import Loader from "../../Components/Loader/Loader";

const AnnualMeeting = () => {
  const [meetingList, setMeetingList] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetingList();
  }, []);

  const fetchMeetingList = async () => {
    try {
      setLoading(true);
      const data = await GetAnnualMeetingPageList();
      setMeetingList(data);

      if (data.length > 0) {
        setSelectedMeeting(data[0]);
      }
    } catch (error) {
      console.error("Error fetching meeting list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMeetingSelect = (meeting) => {
    setSelectedMeeting(meeting);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <PageBanner
        title={"Annual Meeting"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Annual Meeting"
      />
      <div className="main-width">
        <div className="py-10">
          {/* Meeting Selection Tabs */}
          {meetingList.length > 1 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {meetingList.map((meeting) => (
                  <button
                    key={meeting.Id}
                    onClick={() => handleMeetingSelect(meeting)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedMeeting?.Id === meeting.Id
                        ? "bg-[#1560BD] text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {meeting.Title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-[10px,1fr] items-center gap-4">
            <div className={`bg-[#1560BD] h-full`}></div>
            <div
              className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
            >
              <span>
                {selectedMeeting?.Title || "ANNUAL MEETING"} PHOTOGRAPHS
              </span>
            </div>
          </div>

          <div className="mt-10">
            <div
              className="font-bold lg:text-[30px] md:text-[25px] text-[20px] lg:leading-[55px]"
              dangerouslySetInnerHTML={{
                __html:
                  selectedMeeting?.Description ||
                  selectedMeeting?.MainContent ||
                  "",
              }}
            />
          </div>

          <div className="mt-10">
            {selectedMeeting && (
              <AnnualMeetingComponent meetingId={selectedMeeting.Id} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnnualMeeting;
