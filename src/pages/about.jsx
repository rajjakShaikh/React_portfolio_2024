import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import Buttonwobble from "./buttonwobble";
import { FaDownload } from "react-icons/fa";

export default function About() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    mountRef.current.appendChild(renderer.domElement);

    // Create main galaxy
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyMaterial = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
    });

    const particlesCount = 15000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Enhanced spiral galaxy with more complex structure
      const radius = Math.random() * 8;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 6) * Math.PI * 2) / 6;

      // More natural distribution
      const randomX =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
      const randomY =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
      const randomZ =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5 + randomY;
      positions[i * 3 + 2] =
        Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Enhanced color gradient
      const mixedColor = new THREE.Color();
      const insideColor = new THREE.Color("#ff6030");
      const middleColor = new THREE.Color("#1b3984");
      const outsideColor = new THREE.Color("#0c1445");

      if (radius < 3) {
        mixedColor.lerpColors(insideColor, middleColor, radius / 3);
      } else {
        mixedColor.lerpColors(middleColor, outsideColor, (radius - 3) / 5);
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    galaxyGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);
    camera.position.z = 5;
    camera.position.y = 1;

    // Add floating particles
    const floatingParticlesCount = 2000;
    const floatingGeometry = new THREE.BufferGeometry();
    const floatingPositions = new Float32Array(floatingParticlesCount * 3);

    for (let i = 0; i < floatingParticlesCount; i++) {
      floatingPositions[i * 3] = (Math.random() - 0.5) * 20;
      floatingPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      floatingPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    floatingGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(floatingPositions, 3)
    );
    const floatingMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: "#ffffff",
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const floatingParticles = new THREE.Points(
      floatingGeometry,
      floatingMaterial
    );
    scene.add(floatingParticles);

    // Enhanced mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2(0, 0);
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotation.x = mouse.y * 0.3;
      targetRotation.y = mouse.x * 0.3;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Smooth animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation
      galaxy.rotation.y += (targetRotation.y - galaxy.rotation.y) * 0.05;
      galaxy.rotation.x += (targetRotation.x - galaxy.rotation.x) * 0.05;

      // Constant rotation
      galaxy.rotation.y += 0.0003;
      galaxy.rotation.z += 0.0001;

      // Floating particles animation
      floatingParticles.rotation.y -= 0.0001;
      floatingParticles.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/public/resumesoftware_Dev_2024.pdf"; // Replace with your actual resume path
    link.download = "Software_Dev_Resume.pdf"; // Replace with desired download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111827] to-[#1a1a1a] cursor-pointer">
      <div
        ref={mountRef}
        className="absolute inset-0 -z-10 pointer-events-auto"
      />

      <div className="container mx-auto px-4 py-10 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 mb-6 drop-shadow-lg">
            About Me
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Passionate software developer with a focus on creating elegant
            solutions through clean code and intuitive design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            className="glass-card p-8 rounded-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm p-8 rounded-xl hover:shadow-xl transition-all duration-300">
                <h1 className="text-white font-medium text-[18px] mb-3">
                  Name:{" "}
                  <span className="font-medium text-yellow-400 text-[18px]">
                    shaikh rajjak
                  </span>
                </h1>
                <h1 className="text-white font-medium text-[18px] mb-3">
                  Qualification:{" "}
                  <span className="font-medium text-yellow-400 text-[18px]">
                    Bachelor in Computer Science
                  </span>
                </h1>
                <h1 className="text-white font-medium text-[18px] mb-3">
                  Post:{" "}
                  <span className="font-medium text-yellow-400 text-[18px]">
                    Software Developer
                  </span>
                </h1>
                <h1 className="text-white font-medium text-[18px] mb-3">
                  Language:{" "}
                  <span className="font-medium text-yellow-400 text-[18px]">
                    Hindi | English | Marathi
                  </span>
                </h1>
                <h1 className="text-white font-medium text-[18px] mb-3">
                  Skills:{" "}
                  <span className="font-medium text-yellow-400 text-[18px]">
                    Javascript | React JS | Next JS | Redux Toolkit | TanStack
                    Query | Html5 | CSS | Tailwind CSS | Bootstrap5 | Github |
                    Wordpress | PHP
                  </span>
                </h1>
              </div>
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm p-8 rounded-xl hover:shadow-xl transition-all duration-300">
                <h1 className="text-white font-medium text-[18px] mb-3">
                  Hobbies:{" "}
                  <span className="font-medium text-yellow-400 text-[18px]">
                    Coding | Reading | Traveling | Photography
                  </span>
                </h1>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleDownload}
                  className="text-white group border-2 border-[#ffd700] rounded-2xl px-6 py-3 my-2 flex items-center 
      hover:bg-[#ffd700] hover:text-black transition-all duration-300"
                >
                  Download Resume
                  <span className="ml-3 group-hover:rotate-12 transition-transform duration-300">
                    <FaDownload />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[#1a1a1a]/50 backdrop-blur-sm p-8 rounded-xl hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">
                Experience Highlights
              </h2>
              <div className="space-y-4">
                <div className="border-l-2 border-yellow-400 pl-4">
                  <h3 className="text-white font-semibold">
                    Software Developer
                  </h3>
                  <p className="text-yellow-400">
                    Prysom systems (Pune) • FEB-24 - Present
                  </p>
                  <p className="text-gray-300 mt-2">
                    - Spearheaded the development of dynamic and responsive user
                    interfaces using React.js redux toolkit, ensuring seamless
                    user experiences across devices. <br />- Collaborated
                    closely with backend teams to discuss API structures,
                    optimize integrations, and efficiently implement
                    functionality on the frontend. <br /> - Designed reusable
                    and modular components, improving code maintainability and
                    accelerating development for future projects. <br /> -
                    Conducted rigorous testing and debugging to ensure high
                    performance and compatibility across multiple browsers and
                    platforms. <br /> - Actively participated in agile
                    workflows, contributing to sprint planning, code reviews,
                    and knowledge-sharing sessions to enhance team productivity.
                  </p>
                </div>
              </div>
              <div className="space-y-4 mt-5">
                <div className="border-l-2 border-yellow-400 pl-4">
                  <h3 className="text-white font-semibold">
                    Front end developer
                  </h3>
                  <p className="text-yellow-500">
                    Omegasoft Technologies Pvt Ltd (Pune) · Internship • AUG-22
                    - JAN-23
                  </p>
                  <p className="text-gray-300 mt-2">
                    During my internship, I gained hands-on experience in
                    developing dynamic and responsive user interfaces using
                    React.js and Redux Toolkit, enhancing user experiences
                    across devices. also i work in wordpress and php.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technologies */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-yellow-400 text-center mb-8">
            Technologies I Work With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-[#222]/50 p-4 rounded-lg text-center hover:bg-[#2a2a2a]/50 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const technologies = [
  "React.js",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Redux Toolkit",
  "Crypto JS",
  "TailwindCSS",
  "MongoDB",
  "Git",
  "GitLab",
];
