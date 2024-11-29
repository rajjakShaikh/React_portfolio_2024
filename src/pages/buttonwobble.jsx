import React from "react";

export default function Buttonwobble({ module, className }) {
  return (
    <>
      <button
        className={`blob-btn mx-auto px-10 py-3 w-full wobble-effect ${className}`}
      >
        {module}
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
          </span>
        </span>
      </button>

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

      <style jsx>{`
        @keyframes wobble {
          0% {
            transform: translateX(0%);
          }
          15% {
            transform: translateX(-25%) rotate(-5deg);
          }
          30% {
            transform: translateX(20%) rotate(3deg);
          }
          45% {
            transform: translateX(-15%) rotate(-3deg);
          }
          60% {
            transform: translateX(10%) rotate(2deg);
          }
          75% {
            transform: translateX(-5%) rotate(-1deg);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .wobble-effect:hover {
          animation: wobble 0.8s ease-in-out;
        }
      `}</style>
    </>
  );
}
