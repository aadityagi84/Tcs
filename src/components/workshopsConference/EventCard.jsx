import { Link, useParams } from "react-router-dom";

import pdf1 from "../../uploadPdf/eSouvenir-TCS 2024.pdf";
import pdf2 from "../../uploadPdf/16th-tcs-annual-meeting-program-highlights.pdf";
import pdf3 from "../../uploadPdf/basics-of-flow-cytometry-and-lymphocyte-subset-analysis.pdf";
import pdf4 from "../../uploadPdf/hand-on-training-on-flow-cytometry-autumn-school-on-flow-cytometry.pdf";
import pdf5 from "../../uploadPdf/workshop-on-basics-of-flow-cytometry.pdf";
import pdf6 from "../../uploadPdf/AMLMRD-2024.pdf";
import pdf7 from "../../uploadPdf/5thTCSAnnualMeeting2023.pdf";
import pdf8 from "../../uploadPdf/15th-tcs-annual-meeting-program-highlights.pdf";
import pdf9 from "../../uploadPdf/hand-on-training-on-flow-cytometry.pdf";
import pdf10 from "../../uploadPdf/PID-Workshop-2023.pdf";
import pdf11 from "../../uploadPdf/CMC-MRD-workshop-2022.pdf";

export const cardData = {
  upComingEvent: [
    {
      main_title: "Upcoming Workshops & Conferences",
      theme: "",
      Dates: "",
      Venue: "",
      Faculty: "",
      dis: "Explore our upcoming workshops and conferences scheduled for the coming months.  Stay tuned for detailed agendas and registration updates.",
      pdf: "",
      highlight: "",
    },
  ],

  pastEvent: [
    {
      main_title: "16th TCS Annual Conference & Workshop - 2024",
      theme: "Previously conducted workshops and conferences.",
      Dates: "January - May 2025",
      Venue: "Recorded sessions available",
      Faculty: "",
      dis: "",
      pdf: pdf1,
      highlight: pdf2,
    },
    {
      main_title: "Basics of Flow Cytometry and Lymphocyte Subset Analysis",
      theme: "",
      Dates: "",
      Venue: "",
      Faculty: "",
      dis: "Basics of Flow Cytometry and Lymphocyte Subset Analysis For MSc Part I & II Students In collaboration with G.N. Khalsa College & Beckman Coulter India under the aegis of The Cytometry Society 21st September 2024 10:00 AM – 4:00 PM, G.N. Khalsa, Matunga East, Mumbai",
      pdf: "",
      highlight: pdf3,
    },
    {
      main_title:
        "Hand on Training on Flow Cytometry Autumn School on Flow Cytometry",
      theme: "",
      Dates: "",
      Venue: "",
      Faculty: "",
      dis: "Hand on Training on Flow Cytometry Autumn School on Flow Cytometry, Skill Development Centre, School of Life Sciences University of Hyderabad 9th– 13th Sept 2024",
      pdf: "",
      highlight: pdf4,
    },
    {
      main_title: "Workshop on Basics of Flow cytometry",
      theme: "",
      Dates: "",
      Venue: "",
      Faculty: "",
      dis: "22nd - 24th August 2024 SCTIMST , Thiruvananthapuram, Kerala",
      pdf: "",
      highlight: pdf5,
    },
    {
      main_title:
        "Workshop on Acute Myeloid Leukemia Measureable residual disease (MRD) By Flowcytometry and Next Generation Sequencing",
      theme: "",
      Dates: "",
      Venue: "",
      Faculty: "",
      dis: "On 3rd August 2024 Auditorium at Sir Ganga Ram Hospital Delhi, Organized by The Department of Hematology SIR GANGA RAM HOSPITAL Under the aegis of The Cytometry Society, India",
      pdf: "",
      highlight: pdf6,
    },
    {
      main_title: "15th TCS Annual Meeting 2023",
      theme: "From Basics to Multi-Omics",
      Dates: " 28th to 29th October, 2023",
      Venue: "JLN Auditorium, AIIMS, New Delhi",
      Faculty: "",
      dis: "",
      pdf: pdf7,
      highlight: pdf8,
    },
    {
      main_title: "Hand on Training on Flow Cytometry",
      theme: "27th Nov - 02nd Dec, 2023",
      Dates: "",
      Venue:
        "Skill Development Centre School of Life Sciences University of Hyderabad",
      Faculty: "",
      dis: "",
      pdf: "",
      highlight: pdf9,
    },
    {
      main_title: "PID workshop 2023",
      theme: " Primary immunodeficiency",
      Dates: " 19th February 2023",
      title:
        "Role of flowcytometry in primary immunodeficiency- beyond T B & NK Cells",
      Faculty: "",
      Venue: " SGRH - Delhi.",
      dis: "",
      pdf: "",

      highlight: pdf10,
    },
    {
      main_title: "Workshop on MRD in Acute Leukemia & Myeloma",
      theme: " Level Next Flowcytometry",
      Dates: "  2nd & 3rd December 2022",
      title: "",
      Faculty: "",
      Venue:
        " Conference Hall, CMC Vellore – Ranipet Campus, Chennai – Bengaluru Highway",
      dis: "",
      pdf: "",

      highlight: pdf11,
    },
    {
      main_title: "IMMUNOCON-2022",
      theme: "  Level Next Flowcytometry",
      Dates: " 24th & 26th November 2022",
      title: " TCS-2022 - Conference & Workshop ",
      Venue: "  PGIMER, Chandigarh",
      Faculty: "",
      dis: "",
      pdf: "",

      highlight: "https://immunocon.org/",
    },
    {
      main_title: "14th TCS Annual Conference & Flow Cytometry Workshop",
      theme: "   Level Next Flowcytometry",
      Dates: "  15th & 16th October 2022",
      title: "",
      Faculty: "",
      Venue: "  University of Hyderabad",
      dis: "",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/14th-tcs-annual-conference-workshop.php",
    },
    {
      main_title: "13th TCS Annual Conference & Flow Cytometry Workshop",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "TCS-2021 (A virtual Conference & Workshop)Theme: Flowcytometry Applications in Human DiseaseConference (29th to 30th Oct. 2021) & Workshop (22nd to 23rd Oct. 2021)Postgraduate Institute...",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/13th-tcs-annual-conference-workshop.php",
    },
    {
      main_title: "Cytometry Academic Month May 2021",
      theme: "",
      Dates: "",
      title: "",
      Faculty: "",
      Venue: "",
      dis: "Registration... ...",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/cytometry-academic-month-may-2021.php",
    },
    {
      main_title: "CME Series on Hemato Onco-pathology",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "23rd – 24th JULY, 2016, AIIMS, New Delhi Download the...",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/cme-series-hemato-onco-pathology.php",
    },
    {
      main_title: "34th Annual Clinical Cytometry Meeting & Course",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "World Experts. Your Colleagues. Join Us. You are cordially invited to attend ICCS 2019, the 34th International Clinical Cytometry Meeting & Course. Please join your clinical cytometry colleagues at the Atlanta Marriott Marquis...",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/34th-annual-clinical-cytometry-meeting-course.php",
    },
    {
      main_title: "CME-2018/CCEN 7th Practical Clinical Cytometry Course",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "INTRODUCTION The International Clinical Cytometry Society and the European Society for Clinical Cell Analysis is proud to announce our 7th collaborative practical course focusing on clinical cytometry. The course will take place at Tata Memorial Hospital. We welcome...",
      pdf: "",

      highlight: "https://tcs.res.in/events/cme-2018.php",
    },
    {
      main_title: "12th TCS Annual Conference and Flow Cytometry Workshops",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "It gives us great pleasure to announce that the department of Hematology, SGPGI is organizing the forthcoming prestigious annual meeting of The Cytometry Society of India (TCS- India), from 9th to 12th October 2019....",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/12th-tcs-annual-conference-flow-cytometry-workshops.php",
    },
    {
      main_title:
        "HAEMATOLOGY - MORPHOLOGY & BEYOND:CME Workshop on Flow Cytometry",
      theme: "",
      Dates: "",
      title: "",
      Venue:
        "Auditorium, Government Medical College & Hospital, Nagpur,Maharastra, India.  ",
      Faculty:
        "Dr. P. G. Subramanian(TMH, Mumbai), Dr. Prashant Tembhare(TMH, Mumbai), Mr.Y.Badrinath (TMH, Mumbai)...",
      dis: "",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/haematology-morphology-beyondcme-workshop-flow-cytometry.php",
    },
    {
      main_title:
        "FLOW CYTOMETRY IN UNDERSTANDING DEVELOPMENT AND DIAGNOSIS OF NEOPLASTIC DISORDERS OF T & NK-CELLS",
      theme: "",
      Dates: "",
      title: "",
      Venue:
        "American Institute of Pathology & Laboratory Sciences Nallagandla, Serilingampally, Hyderabad – 500 019 Telangana  ",
      Faculty:
        "Dr. P. G. Subramanian(TMH, Mumbai), Dr. Prashant Tembhare(TMH, Mumbai), Dr. Kunal Sehgal...",
      dis: "",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/flow-cytometry-understanding-development-diagnosis-neoplastic-disorders-t-nk-cells.php",
    },
    {
      main_title:
        "11th TCS Annual Meeting & Workshop on 'Flow Cytometry :MULTI-DIMENSIONAL & MULTI-FACETED'",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "Brochure -2018 CONFERENCE WEBSITE Registration Fee AWARDS Registration form Register Here For delegates of Indian Origin (Payment in INR) category Applicable deadlines Conference Only Conference + workshop Regular 31st August...",
      pdf: "",

      highlight: "https://tcs.res.in/events/11th-tcs-annual-meeting.php",
    },
    {
      main_title: "CME in Immunology and TCS-PGI-FCM Workshop on Stem Cell",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "INTRODUCTION We are pleased to inform you that CME in Immunology and TCS-PGI-FCM Workshop on Stem Cell is being organized at the Post Graduate Institute of Medical Education and Research (PGIMER) Chandigarh-India from 11-13 Sept....",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/cme-immunology-tcs-pgi-fcm-workshop-stem-cell.php",
    },
    {
      main_title:
        "10th Annual TCS Meeting followed by hands-on workshop on ‘Applications of Flow Cytometry in Health & Disease",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "TCS welcomes you to its 10th Annual TCS Meeting followed by hands-on workshop on ‘Applications of Flow Cytometry in Health & Disease” jointly organized by SCTIMST, RCC and RGCB in Trivandrum from 28th...",
      pdf: "",

      highlight:
        "https://tcs.res.in/events/10th-annual-tcs-meeting-followed-hands-workshop-applications-flow-cytometry-health-disease.php",
    },
    {
      main_title: "Advanced TCS Flow Cytometry Workshop on MRD-2017",
      theme: "",
      Dates: "",
      title: "",
      Venue: "",
      Faculty: "",
      dis: "The Cytometry Society (TCS) is conducting a four-day training course ‘8th Advanced TCS Flow CytometryWorkshop on Minimal Residual Disease’ Delhi-NCR region from April 26-29, 2017. The program would includetraining in Minimal residual disease for B-ALL, T-ALL, AML and...",
      pdf: "#",

      highlight:
        "https://tcs.res.in/events/advanced-tcs-flow-cytometry-workshop-mrd.php",
    },
  ],
};

const EventCard = ({ page }) => {
  let selectedEvents = null;

  if (page === "upcoming") {
    selectedEvents = cardData.upComingEvent;
  } else if (page === "past") {
    selectedEvents = cardData.pastEvent;
  }

  return (
    <div className="p-6">
      <h2 className="lg:text-2xl md:text-xl text-[18px] font-bold mb-4 capitalize">
        {page} Workshops & Conferences
      </h2>

      {Array.isArray(selectedEvents) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedEvents.map((event, idx) => (
            <div
              key={idx}
              className="p-4 rounded shadow border min-h-[280px] relative rel bg-white"
            >
              <div className="">
                <h3 className="font-extrabold py-2 text-[16px] text-[#0D3F78]">
                  {event.main_title}
                </h3>
                <hr />
                <div className="py-4 space-y-2 text-[14px] font-medium text-[#333333]">
                  {event.theme && (
                    <p className="font-medium">
                      <strong>Theme:</strong> {event.theme}
                    </p>
                  )}
                  {event.Dates && (
                    <p className="font-medium">
                      <strong>Dates:</strong> {event.Dates}
                    </p>
                  )}
                  {event.title && (
                    <p className="font-medium">
                      <strong>Title:</strong> {event.title}
                    </p>
                  )}
                  {event.Venue && (
                    <p className="font-medium">
                      <strong>Venue:</strong> {event.Venue}
                    </p>
                  )}
                  {event.Faculty && (
                    <p className="font-medium">
                      <strong>Faculty:</strong> {event.Faculty}
                    </p>
                  )}
                  <div className="mb-6">{event.dis && <p>{event.dis}</p>}</div>
                </div>
              </div>
              <div className="flex items-center justify-between absolute w-[90%] h-[100px] bottom-0">
                <div className="">
                  {event.pdf !== "" ? (
                    <>
                      <Link to={event.pdf} target="_blank">
                        <span className="bg-[#0D3F78] text-[12px] px-4 py-3 text-white font-medium">
                          eSouvenir TCS-2024
                        </span>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="">
                  {event.highlight !== "" ? (
                    <>
                      <Link to={event.highlight} target="_blank">
                        <span className="bg-[#0D3F78] text-[12px] px-4 py-3 text-white font-medium ">
                          Read More
                        </span>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : selectedEvents ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedEvents.map((event, idx) => (
            <div key={idx} className="p-4 rounded shadow border bg-white">
              <h3 className="font-extrabold py-2 text-[16px] text-[#0D3F78]">
                {event.main_title}
              </h3>
              <hr />
              <div className="py-4 space-y-2 text-[14px] font-medium text-[#333333]">
                {event.theme && (
                  <p className="font-medium">
                    <strong>Theme:</strong> {event.theme}
                  </p>
                )}
                {event.Dates && (
                  <p className="font-medium">
                    <strong>Dates:</strong> {event.Dates}
                  </p>
                )}
                {event.title && (
                  <p className="font-medium">
                    <strong>Title:</strong> {event.title}
                  </p>
                )}
                {event.Venue && (
                  <p className="font-medium">
                    <strong>Venue:</strong> {event.Venue}
                  </p>
                )}
                {event.Faculty && (
                  <p className="font-medium">
                    <strong>Faculty:</strong> {event.Faculty}
                  </p>
                )}
                <div className="mb-6 font-medium">
                  {event.dis && <p>{event.dis}</p>}
                </div>
                <div className="flex items-center justify-between mt-">
                  <div className="">
                    {event.pdf !== "" ? (
                      <>
                        <Link to={event.pdf} target="_blank">
                          <span className="bg-[#0D3F78] text-[12px] px-4 py-3 text-white font-medium">
                            eSouvenir TCS-2024
                          </span>
                        </Link>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="">
                    {event.highlight !== "" ? (
                      <>
                        <Link to={event.highlight} target="_blank">
                          <span className="bg-[#0D3F78] text-[12px] px-4 py-3 text-white font-medium ">
                            Read More
                          </span>
                        </Link>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500">No event data found.</p>
      )}
    </div>
  );
};

export default EventCard;
