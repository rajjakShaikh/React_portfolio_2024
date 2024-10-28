import React from "react";
import { ReactTyped } from "react-typed";
// import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdWavingHand } from "react-icons/md";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 place-items-center h-screen section-home">
      <h1 className="text-[25px] font-bold text-white inline-flex">
        HI THERE ! <MdWavingHand className="ml-3 mt-1" />{" "}
      </h1>
      <h3 className="text-2xl text-white font-bold text-[40px] ">
        I'M{" "}
        <ReactTyped
          strings={["Software developer.", "Rajjak Shaikh."]}
          typeSpeed={40}
          backSpeed={50}
          className="text-yellow-400 font-bold text-[40px] mt-3 pt-4"
          loop
        />
      </h3>
      <div>
        <h3 className="text-white font-medium text-[22px] mt-3 pt-4">
          Motivated and skilled React.js Developer with more than Half years of
          experience in developing and enhancing web applications. Adept at
          creating engaging user interfaces and improving existing UI designs.
          Currently employed at Prysomsystems Pvt Ltd, Pune.
        </h3>
      </div>
      <div className="grid grid-cols-1 text-center mt-10">
        <button
          className="blob-btn mx-auto px-10 py-3"
          onClick={() => navigate("/about")}
        >
          About
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
        </button>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
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
  );
}
