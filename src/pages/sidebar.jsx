import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "../svg/hamburger";
import CloseIcon from "../svg/closeicon";
import { FaLinkedin } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "Home",
      path: "/",
      active: true,
    },
    {
      label: "About",
      path: "/about",
      active: true,
    },
    {
      label: "Portfolio",
      path: "/portfolio",
      active: true,
    },
    {
      label: "Contact",
      path: "/contact",
      active: true,
    },
  ];

  return (
    <>
      <div className="flex">
        <div className="lg:hidden p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? <CloseIcon size={24} /> : <Hamburger size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:block bg-[#1a1a1a] w-1/5 p-4 lg:p-0 lg:relative lg:inset-y-0 lg:flex-col lg:h-auto fixed h-screen lg:text-center`}
        >
          <div>
            <img
              src="../../src/pages/images/userlogo.png"
              alt="logo"
              className="img-user w-[80] h-auto"
            />
          </div>
          <div className="">
            <h2 className="text-white font-medium text-lg">Rajjak Shaikh</h2>
            <h3 className="post">Software Developer</h3>
          </div>
          <div className="sidenavItem flex flex-col items-center space-y-4 mt-4 mx-9">
            {menuItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="flex items-center font-semibold py-2 px-6 w-full text-white border-2 rounded-2xl text-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-500 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          <div className="absolute bottom-0 w-full text-center text-white py-2">
            <p className="font-medium">Follow me</p>
            <div className="grid grid-flow-col gap-8 justify-center py-2">
              <div className="flex justify-center">
                <FaLinkedin className="text-blue-600 text-2xl" />
              </div>
              <div className="flex justify-center">
                <BsInstagram className="text-2xl" />
              </div>
              <div className="flex justify-center">
                <a href="https://github.com/rajjakShaikh/Redux_Toolkit_New">
                  <FaGithubSquare className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 justify-center">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
