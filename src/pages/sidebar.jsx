import { useState } from "react";
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
      <div className="flex h-screen cursor-pointer relative">
        <div className="lg:hidden fixed top-0 left-0 p-4 z-50">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? <CloseIcon size={24} /> : <Hamburger size={24} />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-0 left-0 bg-[#1a1a1a] w-64 lg:w-1/5 min-h-screen transition-transform duration-300 ease-in-out z-40`}
        >
          <div>
            <img
              src="../../src/pages/images/userlogo.png"
              alt="logo"
              className="img-user w-[80] h-auto"
            />
          </div>
          <div className="text-center">
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
                <a
                  href="https://www.linkedin.com/in/rajjak-shaikh-271216243/"
                  target="_blank"
                >
                  <FaLinkedin className="text-blue-600 text-2xl" />
                </a>
              </div>
              <div className="flex justify-center">
                <BsInstagram className="text-2xl" />
              </div>
              <div className="flex justify-center">
                <a
                  href="https://github.com/rajjakShaikh/Redux_Toolkit_New"
                  target="_blank"
                >
                  <FaGithubSquare className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
