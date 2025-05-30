import React from "react";

const Form = () => {
  return (
    <div className="bg-white ">
      <form action="">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-[#8D8D8D] font-medium mb-1">
              First Name
            </label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 border-b border-[#8D8D8D]   focus:outline-none"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-[#011C2A] font-medium mb-1">
              Last Name
            </label>
            <input
              required
              type="text"
              className="w-full px-3 py-2 border-b border-[#8D8D8D]   focus:outline-none"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="mb-6">
            <label className="block text-[#8D8D8D] font-medium mb-1">
              Email
            </label>
            <input
              required
              type="email"
              className="w-full px-3 py-2 border-b border-[#8D8D8D]  focus:outline-none"
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#011C2A] font-medium mb-1">
              Phone Number
            </label>
            <div className="flex">
              <input
                required
                type="tel"
                className="w-full px-3 py-2 border-b border-[#8D8D8D]   focus:outline-none"
                placeholder="9871826989"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[#011C2A] font-semibold mb-1">
            Select Subject?
          </label>
          <div className="flex gap-4 xl:flex-nowrap flex-wrap pt-2">
            <label className="flex items-center">
              <input
                required
                type="radio"
                name="subject"
                className="mr-2"
                defaultChecked
              />
              <span className="">General Inquiry</span>
            </label>
            <label className="flex items-center">
              <input required type="radio" name="subject" className="mr-2" />
              <span className="">General Inquiry</span>
            </label>
            <label className="flex items-center">
              <input required type="radio" name="subject" className="mr-2" />
              <span className="">General Inquiry</span>
            </label>
            <label className="flex items-center">
              <input required type="radio" name="subject" className="mr-2" />
              <span className="">General Inquiry</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[#8D8D8D] font-medium mb-1">
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 border-b border-[#8D8D8D]  focus:outline-none "
            placeholder="Write your message.."
          ></textarea>
        </div>

        <button
          type="submit"
          className=" bg-black text-white py-3 px-6 rounded-[6px] lg:float-right  font-medium"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Form;
