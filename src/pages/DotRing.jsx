import useMousePosition from "./useMousePosition";

const DotRing = () => {
  const { x, y } = useMousePosition();
  return (
    <>
      <div style={{ left: `${x}px`, top: `${y}px` }} className="ring"></div>
      <div className="dot" style={{ left: `${x}px`, top: `${y}px` }}></div>
    </>
  );
};

export default DotRing;
