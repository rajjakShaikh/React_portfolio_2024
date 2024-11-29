import React, { useEffect, useRef } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup
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

    try {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(1);
      containerRef.current.appendChild(renderer.domElement);
    } catch (error) {
      console.error("Error setting up renderer:", error);
      return;
    }

    // Optimized galaxy parameters
    const parameters = {
      count: 5000,
      size: 0.02,
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: "#FFD700",
      outsideColor: "#FFFFFF",
    };

    let geometry = null;
    let material = null;
    let points = null;

    const generateGalaxy = () => {
      if (points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX =
          Math.random() *
          parameters.randomness *
          (Math.random() < 0.5 ? 1 : -1);
        const randomY =
          Math.random() *
          parameters.randomness *
          (Math.random() < 0.5 ? 1 : -1);
        const randomZ =
          Math.random() *
          parameters.randomness *
          (Math.random() < 0.5 ? 1 : -1);

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    generateGalaxy();

    camera.position.z = 6;
    camera.position.y = 2;

    // Simplified controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Optimized resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Simplified animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (points) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }
      renderer.dispose();
      controls.dispose();
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">
              Turning Vision Into Reality
            </span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-bold text-white/90">
            I'm{" "}
            <ReactTyped
              strings={[
                "a Software Developer",
                "a Problem Solver",
                "an Innovation Enthusiast",
              ]}
              typeSpeed={50}
              backSpeed={60}
              className="text-yellow-400"
              loop
            />
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Crafting innovative digital solutions through elegant code and
            intuitive design. Specializing in building scalable web applications
            that deliver exceptional user experiences.
          </p>

          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => navigate("/projects")}
              className="px-8 py-3 text-lg font-semibold text-black bg-yellow-400 
              hover:bg-yellow-500 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              View Projects
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 text-lg font-semibold text-yellow-400 border-2 
              border-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg 
              transform hover:scale-105 transition-all duration-300"
            >
              Contact Me
            </button>
          </div>

          <div className="flex justify-center space-x-6 pt-8">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-yellow-400 transform hover:scale-110 transition-all duration-300"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-yellow-400 transform hover:scale-110 transition-all duration-300"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
