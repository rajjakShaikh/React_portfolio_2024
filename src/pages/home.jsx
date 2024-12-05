import React, { useEffect, useRef } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, MeshPhongMaterial, Mesh } from "three";

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

    // Updated galaxy parameters with golden theme
    const parameters = {
      count: 8000,
      size: 0.015,
      radius: 6,
      branches: 4,
      spin: 1.5,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: "#FFD700", // Golden yellow
      outsideColor: "#FFFFFF", // White
      mouseInteraction: true,
    };

    let geometry = null;
    let material = null;
    let points = null;
    let mouse = new THREE.Vector2();

    // Add mouse move handler
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

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

    // Declare shapes array at the top of useEffect
    const shapes = [];

    // Updated floating shapes with golden theme
    const createFloatingShapes = () => {
      const geometries = [
        new BoxGeometry(0.5, 0.5, 0.5),
        new THREE.TorusGeometry(0.3, 0.1, 16, 32),
        new THREE.OctahedronGeometry(0.3),
        new THREE.TetrahedronGeometry(0.3),
      ];

      const colors = [
        "#FFD700", // Golden yellow
        "#FFF8DC", // Cream white
        "#FFDF00", // Golden
        "#FFFAF0", // Floral white
        "#DAA520", // Goldenrod
      ];

      for (let i = 0; i < 10; i++) {
        const geometry =
          geometries[Math.floor(Math.random() * geometries.length)];
        const material = new MeshPhongMaterial({
          color: new THREE.Color(
            colors[Math.floor(Math.random() * colors.length)]
          ),
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide,
          metalness: 0.5,
          roughness: 0.2,
        });

        const shape = new Mesh(geometry, material);

        // Random positions around the scene
        shape.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );

        // Add random rotation speeds
        shape.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
          },
          floatSpeed: Math.random() * 0.005,
          floatOffset: Math.random() * Math.PI * 2,
        };

        shapes.push(shape);
        scene.add(shape);
      }
    };

    createFloatingShapes();

    // Updated lighting for golden theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffd700, 1); // Golden tinted light
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);

    // Updated animation loop with mouse interaction
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (points) {
        points.rotation.y += 0.001;
        if (parameters.mouseInteraction) {
          points.rotation.x += mouse.y * 0.0005;
          points.rotation.y += mouse.x * 0.0005;
        }
      }

      // Animate floating shapes
      shapes.forEach((shape, i) => {
        // Rotation
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        // Floating motion
        const time = Date.now() * shape.userData.floatSpeed;
        shape.position.y += Math.sin(time + shape.userData.floatOffset) * 0.002;
      });

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
      window.removeEventListener("mousemove", onMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        shape.material.dispose();
        scene.remove(shape);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black cursor-pointer">
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      />

      {/* Updated UI Overlay with golden gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4">
        <div className="max-w-4xl text-center space-y-8">
          {/* Updated heading with golden gradient */}
          <h1 className="text-2xl md:text-7xl font-bold text-white tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-white">
              Hello, I'm a Rajjak
            </span>
          </h1>

          {/* Updated typed text color */}
          <h2 className="text-2xl md:text-4xl font-bold text-white/90">
            I create{" "}
            <ReactTyped
              strings={[
                "modern web applications^1000",
                "scalable applications^1000",
                "innovative solutions^1000",
              ]}
              typeSpeed={50}
              backSpeed={60}
              className="text-yellow-400"
              loop
              cursorChar="|"
              showCursor={true}
              cursorClassName="text-yellow-400 animate-pulse"
            />
          </h2>

          {/* Updated glass-morphism card */}
          <div className="backdrop-blur-lg bg-white/10 p-4 rounded-2xl border border-yellow-400/20 max-w-2xl mx-auto">
            <p className="text-md md:text-md text-white/80 leading-relaxed">
              Dynamic Front-End Developer specializing in React, Next.js, and
              Redux Toolkit, with 1 year of hands-on experience building
              responsive, high-performing, and user-friendly web applications.
              Passionate about crafting seamless UI/UX experiences with
              cutting-edge tools and technologies.
            </p>
          </div>

          {/* Updated buttons with golden styling */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => navigate("/Portfolio")}
              className="px-8 py-3 text-lg font-semibold text-black bg-yellow-400 
              hover:bg-yellow-300 rounded-xl transform hover:scale-105 transition-all duration-300
              shadow-lg shadow-yellow-400/20"
            >
              View Projects
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 text-lg font-semibold text-yellow-400 border-2 
              border-yellow-400 hover:bg-yellow-400 hover:text-black rounded-xl 
              transform hover:scale-105 transition-all duration-300
              backdrop-blur-lg shadow-lg shadow-yellow-400/20"
            >
              Contact Me
            </button>
          </div>

          {/* Updated social links with golden hover effects */}
          <div className="flex justify-center space-x-6 pt-8">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-yellow-400 transform hover:scale-110 
              transition-all duration-300 hover:rotate-12"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-yellow-400 transform hover:scale-110 
              transition-all duration-300 hover:rotate-12"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
