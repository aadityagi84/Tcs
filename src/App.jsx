import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import EventRouter from "./event2025/EventRouter";
import EventCard from "./Components/workshopsConference/EventCard";
import UnderDevelopment from "./event2025/pages/404/UnderDevelopment";

const Home = lazy(() => import("./pages/Home/Home"));
const WorkshopsConference = lazy(() =>
  import("./pages/workshopsConference/workshopsConference")
);
const About = lazy(() => import("./pages/about/About"));
const NotFound = lazy(() => import("./Components/404/NotFound"));
const AnnualMeeting = lazy(() => import("./pages/AnnualMeeting/AnnualMeeting"));
const Laws = lazy(() => import("./pages/Laws/Laws"));
const ECMembers = lazy(() => import("./pages/EcMembers/ECMembers"));
const RegistrationCertificate = lazy(() =>
  import("./pages/RegistrationCertificate/RegistrationCertificate")
);
const AwardDetailsPage = lazy(() =>
  import("./pages/AwardDetailsPage/AwardDetailsPage")
);
const ElectionNotification = lazy(() =>
  import("./pages/ElectionNotification/ElectionNotification")
);
const EducationResources = lazy(() =>
  import("./pages/EducationResource/EducationResources")
);
const AboutMemberShip = lazy(() =>
  import("./pages/aboutMembership/AboutMemberShip")
);
const Contact = lazy(() => import("./pages/conatct/Conatct"));
const App = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/ECMembers", element: <ECMembers /> },
    { path: "/about-membership", element: <AboutMemberShip /> },
    { path: "/annual-meetings", element: <AnnualMeeting /> },
    { path: "/members-list", element: <UnderDevelopment /> },
    { path: "/education-resources", element: <EducationResources /> },
    { path: "/election-notification-2023", element: <ElectionNotification /> },
    { path: "/awards", element: <AwardDetailsPage /> },
    { path: "/byLaws", element: <Laws /> },
    { path: "/contact-us", element: <Contact /> },
    {
      path: "/registration-certificates",
      element: <RegistrationCertificate />,
    },
    { path: "*", element: <NotFound /> },
  ];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/workshops-conferences" element={<WorkshopsConference />}>
          <Route path=":page" element={<EventCard />} />
        </Route>
        <Route path="/event2025/*" element={<EventRouter />} />
      </Routes>
    </Suspense>
  );
};

export default App;
