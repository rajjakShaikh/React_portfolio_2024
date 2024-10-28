import React from "react";

import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Buttonwobble from "./buttonwobble";
import { FaLocationDot } from "react-icons/fa6";

export default function Contact() {
  return (
    <div className="grid place-content-center min-h-screen">
      <div className="grid place-items-center sm:grid-cols-2 items-start gap-16 p-4 mx-auto max-w-4xl bg-[#1a1a1a] font-[sans-serif] shadow-lg rounded-lg">
        <div className="mt-12">
          <h1 className="text-white text-3xl font-extrabold">Let's Talk</h1>
          <p className="text-sm  text-yellow-400 mt-4">
            Connect with me for further details!
          </p>

          <div className="mt-12">
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <MdMarkEmailUnread size={20} color="#ffffff" />
                </div>
                <a
                  href="mailto:razzakshaikh8800@gmail.com"
                  className=" text-sm ml-4"
                >
                  <small className="block text-white font-bold text-[15px]">
                    Mail
                  </small>
                  <a
                    href="mailto:razzakshaikh8800@gmail.com"
                    className="font-bold text-yellow-400"
                  >
                    razzakshaikh8800@gmail.com
                  </a>
                </a>
              </li>
              <li className="flex items-center pt-4">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <FaPhone size={20} color="#ffffff" />
                </div>
                <a href="tel:7743807472" className=" text-sm ml-4">
                  <small className="block font-bold   text-[15px] text-white">
                    Phone
                  </small>
                  <p>
                    {" "}
                    <a
                      href="tel:7743807472"
                      className="font-bold text-yellow-400"
                    >
                      +91 7743807472
                    </a>
                  </p>
                </a>
              </li>
              <li className="flex items-center pt-4">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <FaLocationDot size={20} color="#ffffff" />
                </div>
                <a
                  href="https://maps.app.goo.gl/bUY3Y734WhzVNpQe6"
                  className=" text-sm ml-4 text-white"
                >
                  <small className="block font-bold   text-[15px]">
                    Location
                  </small>
                  <a href="https://maps.app.goo.gl/bUY3Y734WhzVNpQe6">
                    <strong className="font-bold text-yellow-400">
                      Pune Maharashtra
                    </strong>
                  </a>{" "}
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold">Socials</h2>

            <ul className="flex mt-4 space-x-4">
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="#">
                  <FaFacebookF size={20} color="#e3a008" />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="#">
                  <FaTwitter size={20} color="#e3a008" />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="#">
                  <FaInstagram size={20} color="#e3a008" />
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        <form className="ml-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md py-3 px-4 bg-transparent text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md py-3 px-4 bg-transparent text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-md py-3 px-4 bg-transparent text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
          />
          <textarea
            placeholder="Message"
            rows="6"
            className="w-full rounded-md px-4 bg-transparent  text-gray-800 text-sm pt-3 outline-blue-500 focus:bg-transparent"
          ></textarea>
          {/* <button
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6"
          >
            Send
          </button> */}
          <div className="w-full">
            <Buttonwobble module="Send" className="!w-full bg-transparent" />
          </div>
        </form>
      </div>
    </div>
  );
}
