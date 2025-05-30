import React from "react";
import { Globe } from "lucide-react";

const InternationalTeamCard = ({ name, role, title, image, education }) => {
  return (
    <div className="rounded-lg overflow-hidden flex flex-col md:flex-row shadow-xl max-w-6xl transition-transform duration-300 hover:scale-[1.01] bg-white">
      <div className="md:w-2/5 lg:w-1/3 relative">
        <div
          className="h-64 md:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          aria-label={`Photo of ${name}`}
        ></div>
      </div>

      <div className="md:w-3/5 lg:w-2/3 flex flex-col flex-grow border-t-4 border-blue-600 md:border-t-0 md:border-l-4">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-500">
          <h3 className="text-xl md:text-2xl text-white font-bold mb-1">
            {name}
          </h3>
          <p className="text-blue-100 font-semibold text-lg">{role}</p>
        </div>

        <div className="p-6 bg-white flex-grow flex flex-col gap-4">
          <p className="font-medium text-lg text-gray-800">{title}</p>

          {education && (
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5"
                  ></path>
                </svg>
              </div>
              <p className="ml-2 text-gray-700">{education}</p>
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600">
              <Globe size={16} className="mr-2" />
              <span className="font-medium">International Faculty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalTeamCard;
