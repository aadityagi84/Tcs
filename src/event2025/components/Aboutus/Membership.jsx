import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import PageBanner from "../../pages/PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../footer/Footer";
import MembershipDetails from "../../pages/AboutusComponent/MembershipDetails";
import { getMembershipPageList } from "../../Services/services";
import Loader from "../../pages/Loader/Loader";

const Membership = () => {
  const [membershipData, setMembershipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMembershipPageList();
        setMembershipData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching membership data:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-red-500">
          <h2 className="text-2xl font-bold mb-4">Error Loading Data</h2>
          <p>Please try again later.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <PageBanner
        title={membershipData?.Name || "About Membership"}
        subtitle={membershipData?.Title || ""}
        breadcrumb="Home > About Membership"
        backgroundImage={pagesBanner.banner}
        membershipData={membershipData}
      />
      <div className="py-10">
        {membershipData && (
          <MembershipDetails membershipData={membershipData} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Membership;
