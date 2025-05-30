import React, { Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Loader from "./pages/Loader/Loader";
import NotFound from "./pages/404/NotFound";
import "@splidejs/react-splide/css";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./Auth/ProtectedRoute";
import LayoutDashboard from "./pages/Dashboard/Layout";

// Lazy load pages
const Home = React.lazy(() => import("./components/Home/Home"));
const ReceiptPage = React.lazy(() => import("./pages/Receipt/Receipt"));

const RegistrationTable = React.lazy(() =>
  import("./pages/Dashboard/RegistrationTable")
);
const PaymentHistory = React.lazy(() =>
  import("./pages/Dashboard/PaymentHistory/PaymentHistory")
);
const EditProfileForm = React.lazy(() =>
  import("./pages/Dashboard/EditProfile/EditProfile")
);
const AbstractSubmissionForm = React.lazy(() =>
  import("./pages/Dashboard/Abstract/Abstract")
);

const About = React.lazy(() => import("./components/Aboutus/About"));
const Workshop = React.lazy(() => import("./components/Workshops/Workshop"));
const Faculty = React.lazy(() => import("./components/Faculty/FaculityIndex"));
const Signin = React.lazy(() => import("./Auth/Signin"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const Membership = React.lazy(() => import("./components/Aboutus/Membership"));
const Organizing = React.lazy(() =>
  import("./components/OrganizingCommittee/Organizing")
);
const Conference = React.lazy(() =>
  import("./components/Conference/Conference")
);
const Registration = React.lazy(() =>
  import("./pages/registration/Registration")
);
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const AnnualAwards = React.lazy(() =>
  import("./pages/AnnualAwards/AnnualAwards")
);
const Abstract = React.lazy(() => import("./pages/Abstract/Abstract"));
const Exhibition = React.lazy(() => import("./pages/Exhibition/Exhibition"));
const Accommodation = React.lazy(() =>
  import("./pages/Accommodation/Accommodation")
);

// Public routes
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "society", element: <About /> },
  { path: "faculty", element: <Faculty /> },
  { path: "committee", element: <Organizing /> },
  { path: "conferance", element: <Conference /> },
  { path: "workshop", element: <Workshop /> },
  { path: "membership", element: <Membership /> },
  { path: "registration", element: <Registration /> },
  { path: "awards", element: <AnnualAwards /> },
  { path: "abstract", element: <Abstract /> },
  { path: "exhibition", element: <Exhibition /> },
  { path: "accomodation", element: <Accommodation /> },
];

// Protected routes
const protectedRoutes = [
  {
    path: "/dashboard/*",
    element: <Dashboard />,
    children: [
      { path: "registration", element: <RegistrationTable /> },
      { path: "edit-profile", element: <EditProfileForm /> },
      { path: "abstracts", element: <AbstractSubmissionForm /> },
      { path: "receipt", element: <ReceiptPage /> },
      { path: "*", element: <NotFound link={"/dashboard"} /> },
    ],
  },
  { path: "resources", element: "resources" },
  { path: "payment", element: "payment" },
  { path: "edit-profile", element: <EditProfileForm /> },
  { path: "abstracts", element: <AbstractSubmissionForm /> },
  { path: "payment-history", element: <PaymentHistory /> },
];

const DashboardLayout = () => (
  <ProtectedRoute>
    <LayoutDashboard>
      <Outlet />
    </LayoutDashboard>
  </ProtectedRoute>
);

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          {/* Protected routes */}
          {protectedRoutes.map(({ path, element, children }, index) => {
            // If route has children (nested routes)
            if (children && children.length > 0) {
              // Use DashboardLayout wrapper for /dashboard/* in your case
              return (
                <Route key={index} path={path} element={<DashboardLayout />}>
                  {/* Default route if path exactly matches */}
                  <Route index element={element} />
                  {/* Map over nested children */}
                  {children.map(
                    ({ path: childPath, element: childElement }, idx) => (
                      <Route
                        key={idx}
                        path={childPath}
                        element={childElement}
                      />
                    )
                  )}
                </Route>
              );
            }
            return (
              <Route
                key={index}
                path={path}
                element={
                  <ProtectedRoute>
                    <LayoutDashboard>{element}</LayoutDashboard>
                  </ProtectedRoute>
                }
              />
            );
          })}
          {/* Auth pages */}
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />

          {/* Not found */}
          <Route path="*" element={<NotFound link={"/"} />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
