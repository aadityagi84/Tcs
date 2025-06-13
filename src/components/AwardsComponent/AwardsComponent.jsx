import { Link } from "react-router-dom";

const AwardsComponent = ({
  title,
  points = [],
  membershipLinkText,
  membershipLink,
}) => {
  return (
    <section className="mb-10" aria-label="Award Section">
      {/* Title */}
      {title && (
        <h3 className="text-[20px] lg:text-[22px] font-bold mb-4">{title}</h3>
      )}

      {/* Points List */}
      {Array.isArray(points) && points.length > 0 && (
        <ul className="list-disc pl-6 space-y-4 text-base lg:text-[22px] text-gray-800">
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      )}

      {/* Membership Link */}
      {membershipLinkText && membershipLink && (
        <div className="mt-4">
          <Link
            to={membershipLink}
            className="text-black underline text-base lg:text-[22px] font-medium hover:text-blue-600 transition-colors"
          >
            ({membershipLinkText})
          </Link>
        </div>
      )}
    </section>
  );
};

export default AwardsComponent;
