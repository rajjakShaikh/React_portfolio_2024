import { useEffect, useRef } from "react";
import * as THREE from "three";
// import { useNavigate } from "react-router-dom";
import Buttonwobble from "./buttonwobble";

export default function Portfolio() {
  // const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const goldColor = new THREE.Color("#FFD700"); // Golden yellow
    const whiteColor = new THREE.Color("#FFFFFF"); // White

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Create a wider distribution
      const radius = Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      // Wider spread of particles
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Color distribution
      const color = Math.random() > 0.5 ? goldColor : whiteColor;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    // Adjusted particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Position camera further back
    camera.position.z = 15;

    // Add stronger ambient light
    const ambientLight = new THREE.AmbientLight(0xffd700, 0.8);
    scene.add(ambientLight);

    // Mouse movement effect
    const mouse = {
      x: 0,
      y: 0,
      target: { x: 0, y: 0 },
    };

    document.addEventListener("mousemove", (event) => {
      mouse.target.x = event.clientX / window.innerWidth - 0.5;
      mouse.target.y = -(event.clientY / window.innerHeight - 0.5);
    });

    // Improved resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth mouse movement
      mouse.x += (mouse.target.x - mouse.x) * 0.05;
      mouse.y += (mouse.target.y - mouse.y) * 0.05;

      // Rotate particles
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      // Wave effect
      const positions = particlesGeometry.attributes.position.array;
      const time = Date.now() * 0.0003;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const z = positions[i3 + 2];

        // Gentler wave movement
        positions[i3 + 1] += Math.sin(time + x + z) * 0.005;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Smoother camera movement
      camera.position.x = mouse.x * 5;
      camera.position.y = mouse.y * 5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(particlesMesh);
      ambientLight.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen cursor-pointer">
      <div
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-auto"
      />

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
        </div>
      </div>
    </div>
  );
}
