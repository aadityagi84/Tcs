import React from "react";
import TeamCard from "./TeamCard";
import Loader from "../../pages/Loader/Loader";

const OrganizingTeam = ({ committeeData, loading, error }) => {
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

  return (
    <div className="py-10">
      <div className="main-width">
        {committeeData.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {committeeData.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                title={member.title}
                image={member.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>No committee members available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizingTeam;
