import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DotRing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId;

    const updateMousePosition = (e) => {
      // Debounced mouse position update
      if (timeoutId) cancelAnimationFrame(timeoutId);

      timeoutId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timeoutId) cancelAnimationFrame(timeoutId);
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <>
          {/* Cursor dot */}
          <motion.div
            className="fixed w-3 h-3 bg-yellow-400 rounded-full pointer-events-none z-50"
            animate={{
              x: mousePosition.x - 6,
              y: mousePosition.y - 6,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          />

          {/* Cursor ring */}
          <motion.div
            className="fixed w-8 h-8 border-2 border-yellow-400 rounded-full pointer-events-none z-50"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
              mass: 0.8,
            }}
          />
        </>
      )}
    </>
  );
};

export default DotRing;
