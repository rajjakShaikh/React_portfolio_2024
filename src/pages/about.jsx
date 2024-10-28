import React from "react";

export default function About() {
  return (
    <>
      <div className="mx-10">
        <div className="grid grid-cols-1 place-items-center mt-20 border-b-2 border-gray-300">
          <h1 className="font-medium text-yellow-400  text-[40px]">
            {" "}
            About <span className="text-white text-[40px] font-medium">
              Me
            </span>{" "}
          </h1>
        </div>

        <div className="grid grid-cols-2 mt-5">
          <div>
            <h1 className="text-white font-medium text-[22px] mb-3">
              Name :{" "}
              <span className=" font-medium text-yellow-400 text-[22px]">
                shaikh rajjak
              </span>{" "}
            </h1>
            <h1 className="text-white font-medium text-[22px]  mb-3">
              Qualification :{" "}
              <span className=" font-medium text-yellow-400 text-[22px]">
                Bachelor in Computer Science
              </span>{" "}
            </h1>
            <h1 className="text-white font-medium text-[22px]  mb-3">
              Post :{" "}
              <span className=" font-medium text-yellow-400 text-[22px]">
                Software Developer
              </span>{" "}
            </h1>

            <h1 className="text-white font-medium text-[22px]  mb-3">
              Language :{" "}
              <span className=" font-medium text-yellow-400 text-[22px]">
                Hindi | English | Marathi
              </span>{" "}
            </h1>

            <h1 className="text-white font-medium text-[22px]  mb-3">
              Skills :{" "}
              <span className=" font-medium text-yellow-400 text-[22px]">
                Javascript| Rect JS | Next JS |Redux Toolkit | TanStack Query |
                Html5 | CSS | Tailwind CSS| Bootstrap5 | Github | Wordpress |
                PHP
              </span>{" "}
            </h1>
            {/* <h1 className="text-white font-medium text-[22px]  mb-3">
            Soft Skills :{" "}
            <span className=" font-medium text-yellow-400 text-[22px]">
              <ul>
                <li>Strong problem-solving abilities</li>
                <li>communication skills </li>
                <li>Team collaboration and leadership</li>
                <li> Time management and multitasking</li>
                <li> Attention to detail </li>
                <li>Adaptability and quick learning</li>
              </ul>{" "}
            </span>{" "}
          </h1> */}
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="w-15 h-29 p-5 text-center bg-[#222]">
              <h1 className="text-yellow-400 font-bold text-[22px]">1.6</h1>
              <span className="text-white font-medium text-[20px]">
                Year of Experience <br />
                <span className="font-light text-[18px] pb-4">
                  <a
                    href="https://www.linkedin.com/in/rajjak-shaikh-271216243/details/experience/"
                    target="_blank"
                    className="text-blue-700  border-b border-blue-600 hover:text-blue-800 hover:font-medium hover:text-[20px]"
                  >
                    {" "}
                    visit
                  </a>
                </span>
              </span>
            </div>
            <div className="w-15 h-29 p-5 text-center bg-[#222]">
              <h1 className="text-yellow-400  font-bold text-[22px]">5</h1>
              <span className="text-white font-medium text-[20px]">
                Project Completed <br />
                <span className="font-light text-[18px]">
                  {" "}
                  <a
                    href="https://github.com/rajjakShaikh"
                    target="_blank"
                    className="text-blue-700 border-b border-blue-600 hover:text-blue-800 hover:font-medium hover:text-[20px]"
                  >
                    {" "}
                    visit
                  </a>
                </span>
              </span>
            </div>

            <div className="w-15 h-29 p-5 text-center bg-[#222]">
              <h1 className="text-yellow-400 font-bold text-[22px]">2</h1>
              <span className="text-white font-medium text-[20px]">
                Certificate <br />
                <span className="font-light text-[18px]">
                  {" "}
                  <a
                    href="https://www.linkedin.com/in/rajjak-shaikh-271216243/details/certifications/"
                    target="_blank"
                    className="text-blue-700 border-b border-blue-600 hover:text-blue-800 hover:font-medium hover:text-[20px]"
                  >
                    {" "}
                    visit
                  </a>
                </span>
              </span>
            </div>
            <div className="w-15 h-29 p-5 text-center bg-[#222]">
              <h1 className="text-yellow-400  font-bold text-[22px]">5</h1>
              <span className="text-white font-medium text-[20px]">
                Project Completed
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 text-center mt-10">
          <a
            href="/resumesoftware_Dev_2024.pdf"
            download
            className="inline-block"
          >
            <button className="blob-btn mx-auto px-6 py-3">
              Download CV
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </button>
          </a>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="hidden"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                result="goo"
              ></feColorMatrix>
              <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
}
