import React from "react";
import Buttonwobble from "./buttonwobble";
import { useNavigate } from "react-router-dom";

export default function Portfolio() {
  const navigate = useNavigate();
  return (
    <div className="mx-10">
      <div className="grid grid-cols-1 place-items-center mt-20 border-b-2 border-gray-300">
        <h1 className="font-medium text-white text-[40px]">
          My{" "}
          <span className="text-yellow-400 text-[40px] font-medium">
            Portfolio
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        {/* Project Info on the left */}
        <div className="text-white">
          <h2 className="text-[24px] font-semibold mb-4">
            Food E-Cosmmerce UI
          </h2>
          <p className="text-[18px] mb-3">
            This project is a fully responsive e-commerce UI designed for a food
            delivery service. It includes a clean and modern design,
            user-friendly navigation, and smooth animations. Built using React,
            Tailwind CSS, and other modern web development tools.
          </p>
          <a
            href="https://flavourfusioncafe.netlify.app/"
            target="_blank"
            className="inline-block"
          >
            <Buttonwobble
              module={"View Project"}
              className="!px-4 py-2 font-light"
            />
          </a>
        </div>

        {/* Images on the right */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/images/fla1.png"
            alt="img1"
            className="w-full rounded-lg"
          />
          <img
            src="/images/fla2.png"
            alt="img2"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        {/* Project Info on the left */}
        <div className="text-white">
          <h2 className="text-[24px] font-semibold mb-4">Medicca Press</h2>
          <p className="text-[18px] mb-3">
            This project is a fully responsive e-commerce UI designed for a food
            delivery service. It includes a clean and modern design,
            user-friendly navigation, and smooth animations. Built using React,
            Tailwind CSS, and other modern web development tools.
          </p>
          <a
            href="https://flavourfusioncafe.netlify.app/"
            className="inline-block"
          >
            <Buttonwobble
              module={"View Project"}
              className="!px-4 py-2 font-light"
            />
          </a>
        </div>

        {/* Images on the right */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/images/fla1.png"
            alt="img1"
            className="w-full rounded-lg"
          />
          <img
            src="/images/fla2.png"
            alt="img2"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
