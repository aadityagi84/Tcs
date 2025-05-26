import React from "react";
import { ChevronRight, Check, CreditCard, Award, Clock } from "lucide-react";

const MembershipOptions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Renew Membership Option */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              Renew Membership
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Annual membership renewal
            </p>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg">
            <CreditCard size={20} className="text-blue-600" />
          </div>
        </div>

        <div className="font-bold text-3xl text-gray-900 mb-4">₹ 1,416</div>

        <ul className="text-sm space-y-3 mb-6">
          <li className="flex items-start">
            <Check
              size={16}
              className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
            />
            <span>Renewal for one year</span>
          </li>
          <li className="flex items-start">
            <Check
              size={16}
              className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
            />
            <span>Student Renewal fee 100+18% GST</span>
          </li>
          <li className="flex items-start">
            <Check
              size={16}
              className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
            />
            <span>Remaining payment till now</span>
          </li>
          <li className="flex items-start">
            <Check
              size={16}
              className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
            />
            <span>Renewal fee 100+18% GST</span>
          </li>
        </ul>

        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2.5 px-4 text-sm font-medium flex items-center justify-center w-full shadow-sm hover:shadow transition-all">
          <span>Renew Your Plan</span>
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      {/* Life Membership Option */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium">
          Recommended
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              Life Membership
            </h3>
            <p className="text-sm text-gray-500 mt-1">Lifetime access</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Award size={20} className="text-blue-600" />
          </div>
        </div>

        <div className="font-bold text-3xl text-gray-900 mb-4">₹ 4,720</div>

        <ul className="text-sm space-y-3 mb-6">
          <li className="flex items-start">
            <Check
              size={16}
              className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
            />
            <span className="flex items-center">
              Pay Once Get Validity For Lifetime
              <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Best Value
              </span>
            </span>
          </li>
          <li className="flex items-start">
            <Check
              size={16}
              className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
            />
            <span>Student Upgradation to lifemember fee 4000+18% GST</span>
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
            Sunil-R
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2.5 px-4 text-sm font-medium flex items-center justify-center sm:flex-grow-0 w-full sm:w-auto shadow-sm hover:shadow transition-all">
            <span>Upgrade Your Plan</span>
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Last Payment Section */}
      <div className="bg-gradient-to-br from-teal-600 to-blue-700 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 -mb-10 -ml-10 bg-white opacity-10 rounded-full"></div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">Last Payment</h3>
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <Clock size={20} className="text-white" />
          </div>
        </div>

        <div className="font-bold text-3xl mb-2">₹ 1,416</div>
        <div className="text-sm mb-8 opacity-80">19 May 2023</div>

        <div className="flex flex-col space-y-2">
          <div className="text-xs font-medium uppercase opacity-80 mb-1">
            Payment Method
          </div>
          {/* <div className="flex items-center space-x-3">
            <div className="bg-white h-10 w-12 rounded-md flex items-center justify-center">
              <CreditCard className="text-blue-600" size={20} />
            </div>
            <div>
              <div className="text-sm font-medium">•••• •••• •••• 4242</div>
              <div className="text-xs opacity-80">Expires 12/24</div>
            </div>
          </div> */}

          <div className="mt-4 pt-4 border-t border-white border-opacity-20">
            <div className="flex items-center justify-between">
              <span className="text-sm">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Paid
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipOptions;
