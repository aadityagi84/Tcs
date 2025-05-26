import React from "react";
import TeamCard from "../../pages/OrganizingCommitteePage/TeamCard";
import InternationalTeamCard from "./InternationalTeamCard";
import Loader from "../../pages/Loader/Loader";

const Faculty = ({ facultyData, loading, error }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="main-width">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  // Group faculty members by category (Indian vs International)
  const indianFaculty = facultyData.filter(
    (member) => member.category === "Indian"
  );
  const internationalFaculty = facultyData.filter(
    (member) => member.category === "International"
  );

  return (
    <div>
      <div className="py-10">
        <div className="main-width">
                {/* International Faculty Section */}
          {internationalFaculty.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-blue-600">
                International Faculty
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {internationalFaculty.map((member) => (
                  <InternationalTeamCard
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    title={member.title}
                    image={member.image}
                    education={member.education}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Indian Faculty Section */}
          {indianFaculty.length > 0 && (
            <div className="">
              <h2 className="text-2xl font-bold mb-6 text-blue-600">
                Indian Faculty
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {indianFaculty.map((member) => (
                  <TeamCard
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    title={member.title}
                    image={member.image}
                  />
                ))}
              </div>
            </div>
          )}

    

          {facultyData.length === 0 && (
            <div className="text-center">
              <p>No faculty members available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faculty;
