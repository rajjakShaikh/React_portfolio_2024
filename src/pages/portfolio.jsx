import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import Buttonwobble from "./buttonwobble";

export default function Portfolio() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    // Three.js background setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: "#ffd700",
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);
    camera.position.z = 2;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Three.js canvas background */}
      <div ref={canvasRef} className="absolute inset-0 -z-10" />

      {/* Content */}
      <div className="relative z-10 px-8 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-4">
            My <span className="text-yellow-400">Portfolio</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Exploring the intersection of design and technology through creative
            web solutions
          </p>
        </div>

        <div className="space-y-32">
          {/* Project 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-3xl font-bold text-white">
                Flavour Fusion Café
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A modern food delivery platform featuring an intuitive user
                interface, real-time order tracking, and seamless payment
                integration. The project showcases advanced React patterns,
                custom animations, and responsive design principles.
              </p>
              <div className="flex gap-4">
                <span className="text-yellow-400 text-sm">React</span>
                <span className="text-yellow-400 text-sm">Tailwind CSS</span>
                <span className="text-yellow-400 text-sm">Firebase</span>
              </div>
              <a
                href="https://flavourfusioncafe.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Buttonwobble
                  module="View Project"
                  className="!px-6 !py-3 text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 hover:scale-105 transition-transform">
              <img
                src="/images/fla1.png"
                alt="Flavour Fusion Screenshot 1"
                className="w-full rounded-lg shadow-xl"
              />
              <img
                src="/images/fla2.png"
                alt="Flavour Fusion Screenshot 2"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
          {/* Project 2*/}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-3xl font-bold text-white">
                NPCI Admin, issuer,corporate Portal
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A modern food delivery platform featuring an intuitive user
                interface, real-time order tracking, and seamless payment
                integration. The project showcases advanced React patterns,
                custom animations, and responsive design principles.
              </p>
              <div className="flex gap-4">
                <span className="text-yellow-400 text-sm">React</span>
                <span className="text-yellow-400 text-sm">Tailwind CSS</span>
                <span className="text-yellow-400 text-sm">Firebase</span>
              </div>
              <a
                href="https://flavourfusioncafe.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Buttonwobble
                  module="View Project"
                  className="!px-6 !py-3 text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 hover:scale-105 transition-transform">
              <img
                src="/images/fla1.png"
                alt="Flavour Fusion Screenshot 1"
                className="w-full rounded-lg shadow-xl"
              />
              <img
                src="/images/fla2.png"
                alt="Flavour Fusion Screenshot 2"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* Project 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-3xl font-bold text-white">Medicca Press</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A comprehensive healthcare management system featuring
                appointment scheduling, patient records management, and
                integrated billing solutions. Built with security and
                performance in mind, utilizing modern web technologies.
              </p>
              <div className="flex gap-4">
                <span className="text-yellow-400 text-sm">Next.js</span>
                <span className="text-yellow-400 text-sm">TypeScript</span>
                <span className="text-yellow-400 text-sm">MongoDB</span>
              </div>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Buttonwobble
                  module="View Project"
                  className="!px-6 !py-3 text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 hover:scale-105 transition-transform">
              <img
                src="/images/med1.png"
                alt="Medicca Press Screenshot 1"
                className="w-full rounded-lg shadow-xl"
              />
              <img
                src="/images/med2.png"
                alt="Medicca Press Screenshot 2"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
