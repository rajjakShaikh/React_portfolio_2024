import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import Buttonwobble from "./buttonwobble";

export default function Contact() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    canvasRef.current.appendChild(renderer.domElement);

    // Create animated sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: "#fbbf24",
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);

    // Add lights
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(sphere);

    camera.position.z = 10;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
      {/* 3D Background */}
      <div
        ref={canvasRef}
        className="absolute top-0 right-0 w-1/2 h-full opacity-30"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-yellow-400 text-lg">
            Let's create something amazing together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <div className="bg-[#1a1a1a]/50 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-8">
              Contact Information
            </h2>

            {/* Contact Details */}
            <ul className="space-y-6">
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

            {/* Additional Content */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-white mb-4">
                Office Hours
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                <li>Saturday: 10:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-[#1a1a1a]/50 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-8">Send Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-lg py-3 px-4 bg-[#2a2a2a]/50 text-white placeholder-gray-400 outline-none border border-transparent focus:border-yellow-400 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg py-3 px-4 bg-[#2a2a2a]/50 text-white placeholder-gray-400 outline-none border border-transparent focus:border-yellow-400 transition-all"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-lg py-3 px-4 bg-[#2a2a2a]/50 text-white placeholder-gray-400 outline-none border border-transparent focus:border-yellow-400 transition-all"
              />
              <textarea
                placeholder="Message"
                rows="6"
                className="w-full rounded-lg py-3 px-4 bg-[#2a2a2a]/50 text-white placeholder-gray-400 outline-none border border-transparent focus:border-yellow-400 transition-all"
              ></textarea>
              <Buttonwobble module="Send Message" className="w-full" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
