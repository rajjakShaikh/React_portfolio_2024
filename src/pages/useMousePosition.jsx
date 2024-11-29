import { useEffect, useState } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener("mousemove", mouseMoveHandler);

    let animationFrameId;
    const smoothFactor = 0.15;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothFactor,
        y: prev.y + (mousePosition.y - prev.y) * smoothFactor,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition.x, mousePosition.y]);

  return smoothPosition;
}
