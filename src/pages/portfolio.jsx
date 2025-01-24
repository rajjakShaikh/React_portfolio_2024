import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Buttonwobble from "./buttonwobble";
import { useNavigate } from "react-router-dom";

export default function Portfolio() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState([false, false, false]);

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
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Hide overflow to prevent horizontal scrollbar
    document.body.style.overflow = "hidden";

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
      document.body.style.overflow = "auto"; // Reset overflow on cleanup
    };
  }, []);
  const handleReadMore = (index) => {
    setIsExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const handlenavigate = () => {
    console.log("button is click");
    navigate("/SecurityMessage");
  };

  return (
    <div className="relative min-h-screen cursor-pointer">
      <div
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
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
            {/* 1st project npci */}
            <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-xl font-bold text-white">
                National Payments Corporation of India (NPCI)
              </h2>
              <p
                className={`text-gray-300 text-lg ${
                  isExpanded[0] ? "" : "max-h-28 overflow-hidden"
                }`}
              >
                Developed a robust NPCI Portal system with three modules: Admin
                Portal, Issuer Portal, and Corporate Portal, using React JS,
                Tailwind CSS, Axios, and Redux Toolkit. The Admin Portal allows
                onboarding of banks as issuers, while the Issuer Portal manages
                corporate accounts, and the Corporate Portal adds and manages
                employees. Integrated crypto-js for secure data handling,
                Chart.js for data visualization, and Formik for form validation.
                Designed with dynamic routing and a fully responsive grid
                layout, ensuring seamless navigation and usability across
                devices. This project demonstrates expertise in secure,
                scalable, and responsive web applications.
              </p>
              <button
                onClick={() => handleReadMore(0)}
                className="text-yellow-400 outline outline-1 p-2 rounded-2xl text-sm"
              >
                Read more...
              </button>
              <div className="grid grid-cols-5">
                <div className="text-yellow-400 text-sm">React,</div>
                <div className="text-yellow-400 text-sm">Tailwind CSS,</div>
                <div className="text-yellow-400 text-sm">Redux toolkit,</div>
                <div className="text-yellow-400 text-sm">Crypto js,</div>
                <div className="text-yellow-400 text-sm">Formik,</div>
                <div className="text-yellow-400 text-sm">Axios,</div>
                <div className="text-yellow-400 text-sm">Chart js,</div>
                <div className="text-yellow-400 text-sm">Gitlab,</div>
              </div>

              <Buttonwobble
                module="View Project"
                onClick={handlenavigate}
                className="!py-2 mt-4 text-lg font-medium hover:scale-105 transition-transform"
              />
            </div>

            {/* 2nd project Kickitup shoes react */}
            <div className="space-y-6 mt-2">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-xl pt-2 font-bold text-white">
                KickItUp E-commerce shoes Store{" "}
              </h2>
              <p
                className={`text-gray-300 text-lg ${
                  isExpanded[1] ? "" : "max-h-28 overflow-hidden"
                }`}
              >
                Developed a modern and responsive Shoe Store Website using React
                JS, Redux Toolkit, and Tailwind CSS, featuring a sleek and
                user-friendly interface. The website includes functionality for
                adding products to a cart with real-time updates, wishlist
                management, and category-based filtering for personalized
                browsing. It ensures seamless performance across devices with a
                fully responsive design. Efficient state management using Redux
                Toolkit enables smooth handling of cart and wishlist features.
                This project demonstrates expertise in creating visually
                appealing, functional, and dynamic e-commerce applications.
              </p>
              <button
                onClick={() => handleReadMore(1)}
                className="text-yellow-400 mt-3 outline outline-1 p-2 rounded-2xl text-sm"
              >
                Read more...
              </button>
              <div className="flex gap-4 mt-8">
                <span className="text-yellow-400 text-sm">React JS</span>
                <span className="text-yellow-400 text-sm">Tailwind CSS</span>
                <span className="text-yellow-400 text-sm">Redux toolkit</span>
                <span className="text-yellow-400 text-sm">Crypto js</span>
                <span className="text-yellow-400 text-sm">Axios</span>
                <span className="text-yellow-400 text-sm">Github</span>
              </div>
              <a
                href="https://kickitup.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Buttonwobble
                  module="View Project"
                  className="!py-2 mt-[50px] text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div>

            {/* 4rd project mediccapress */}
            <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-xl font-bold text-white">El Junto</h2>
              <p
                className={`text-gray-300 text-lg ${
                  isExpanded[2] ? "" : "max-h-28 overflow-hidden"
                }`}
              >
                Developed a simple and responsive ElJunto static website using
                HTML, Bootstrap, and GitHub. The site provides an overview of
                the ElJunto mobile app and includes key pages such as the Home
                Page, Privacy Policy, and Terms of Service. Designed to ensure a
                clean layout with seamless responsiveness for an optimal viewing
                experience across devices. This project demonstrates expertise
                in building lightweight and user-focused static web solutions.
              </p>
              <div className="flex gap-4">
                <span className="text-yellow-400 text-sm">Html5</span>
                <span className="text-yellow-400 text-sm">Bootstrap 5</span>
                <span className="text-yellow-400 text-sm">javascript</span>
                <span className="text-yellow-400 text-sm">github</span>
              </div>
              <button
                onClick={() => handleReadMore(2)}
                className="text-yellow-400  outline outline-1 p-2 rounded-2xl text-sm"
              >
                Read more...
              </button>
              <a
                href="https://eljunto.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Buttonwobble
                  module="View Project"
                  className="!py-2 mt-4  text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div>

            <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-xl font-bold text-white">
                Cerave OBS Study Website
              </h2>
              <p
                className={`text-gray-300 text-lg ${
                  isExpanded[2] ? "" : "max-h-28 overflow-hidden"
                }`}
              >
                Designed and developed a fully responsive and production-ready
                website using HTML, Bootstrap, CSS, and PHP. The site is
                optimized for performance and user experience, showcasing a
                clean and professional layout suitable for its target audience.
              </p>
              <div className="flex gap-4">
                <span className="text-yellow-400 text-sm">Html5</span>
                <span className="text-yellow-400 text-sm">Bootstrap 5</span>
                <span className="text-yellow-400 text-sm">Php</span>
                <span className="text-yellow-400 text-sm">Css3</span>
                <span className="text-yellow-400 text-sm">javascript</span>
                <span className="text-yellow-400 text-sm">github</span>
              </div>
              <button
                onClick={() => handleReadMore(2)}
                className="text-yellow-400  outline outline-1 p-2 rounded-2xl text-sm"
              >
                Read more...
              </button>
              <a
                href="https://cerave-obs-study.mediccapress.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Buttonwobble
                  module="View Project"
                  className="!py-2 mt-4  text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div>

            <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-xl font-bold text-white">
                Fibrosis calculator (MediccaPress)
              </h2>
              <p
                className={`text-gray-300 text-lg ${
                  isExpanded[2] ? "" : "max-h-28 overflow-hidden"
                }`}
              >
                Developed a FIB-4 calculator using Next.js to analyze liver
                fibrosis risk. The tool allows users to input age, AST, ALT, and
                platelet count (with unit conversion) and calculates the FIB-4
                score dynamically. Features include real-time validation,
                responsive design, and a user-friendly interface for healthcare
                professionals.
              </p>
              <div className="flex gap-4">
                <span className="text-yellow-400 text-sm">Next JS</span>
                <span className="text-yellow-400 text-sm">Tailwind CSS</span>
                <span className="text-yellow-400 text-sm">github</span>
              </div>
              <button
                onClick={() => handleReadMore(2)}
                className="text-yellow-400  outline outline-1 p-2 rounded-2xl text-sm"
              >
                Read more...
              </button>
              <a
                href="https://fib-4-score-calculator.mediccapress.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Buttonwobble
                  module="View Project"
                  className="!py-2 mt-4  text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div>

            <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                FEATURED PROJECT
              </span>
              <h2 className="text-xl font-bold text-white">
                Katha-Mehfil (Story Station)
              </h2>
              <p
                className={`text-gray-300 text-lg ${
                  isExpanded[2] ? "" : "max-h-28 overflow-hidden"
                }`}
              >
                Designed and developed a fully responsive Katha Mehfil website
                using React.js and Tailwind CSS. The project focuses on an
                elegant, user-friendly interface optimized for various screen
                sizes. Currently in development, with the full design completed
                and responsiveness implemented.
              </p>
              <div className="flex gap-4">
                <span className="text-yellow-400 text-sm">React JS</span>
                <span className="text-yellow-400 text-sm">Tailwind CSS</span>
                <span className="text-yellow-400 text-sm">github</span>
              </div>
              <button
                onClick={() => handleReadMore(2)}
                className="text-yellow-400  outline outline-1 p-2 rounded-2xl text-sm"
              >
                Read more...
              </button>
              <a
                href="https://kathamehfil.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Buttonwobble
                  module="View Project"
                  className="!py-2 mt-4  text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div>

            {/* <div className="space-y-6">
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                WORDPRESS FEATURED PROJECT
              </span>

              <p
                className={`text-gray-300 text-lg ${
                  isExpanded[2] ? "" : "max-h-28 overflow-hidden"
                }`}
              >
                Developed a fully functional WordPress website from scratch,
                tailored to meet the client’s specific requirements. This
                project involved creating custom themes, integrating essential
                plugins, and ensuring responsive design for an optimal user
                experience across all devices. The website features seamless
                navigation, dynamic content management, and enhanced
                performance.
              </p>
              <div className="grid gap-2">
                <div>
                  <a
                    href="https://prysomsystems.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline transition duration-200"
                  >
                    https://prysomsystems.com/
                  </a>
                </div>
                <div>
                  <a
                    href="https://prysoms.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline transition duration-200"
                  >
                    https://prysoms.com/
                  </a>
                </div>
                <div>
                  <a
                    href="https://anomadigital.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline transition duration-200"
                  >
                    https://anomadigital.com/
                  </a>
                </div>
                <div>
                  <a
                    href="http://ganeshcnc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline transition duration-200"
                  >
                    http://ganeshcnc.com/
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.cutedgeengineering.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline transition duration-200"
                  >
                    https://www.cutedgeengineering.com/
                  </a>
                </div>
                <div>
                  <a
                    href="https://fabulousmaths.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline transition duration-200"
                  >
                    https://fabulousmaths.com/
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleReadMore(2)}
                className="text-yellow-400 outline outline-1 p-2 rounded-2xl text-sm hover:bg-yellow-400 hover:text-white transition"
              >
                Read more...
              </button>
              <a
                href="https://cerave-obs-study.mediccapress.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Buttonwobble
                  module="View Project"
                  className="!py-2 mt-4 text-lg font-medium hover:scale-105 transition-transform"
                />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
