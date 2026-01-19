import React, { useRef, useState, useEffect } from "react";

function ViewController({ colSize, setColSize }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const circleSize = 12; // dairə ölçüsü px ilə

  useEffect(() => {
    if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth);

    const handleResize = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMove = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    let x = clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = x / rect.width;

    let newCol = 3;
    if (percent < 0.2) newCol = 1;
    else if (percent < 0.4) newCol = 2;
    else if (percent < 0.6) newCol = 3;
    else if (percent < 0.8) newCol = 4;
    else newCol = 6;

    setColSize(newCol);
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    handleMove(e.clientX);
  };
  const handleMouseMove = (e) => dragging && handleMove(e.clientX);
  const handleMouseUp = () => setDragging(false);

  const handleTouchStart = (e) => handleMove(e.touches[0].clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

  const getCircleLeft = () => {
    if (!trackWidth) return 0;

  
    let percent = 0;
    if (colSize === 1) percent = 0;
    else if (colSize === 2) percent = 0.25;
    else if (colSize === 3) percent = 0.5;
    else if (colSize === 4) percent = 0.75;
    else percent = 1;

    return `${percent * trackWidth - circleSize / 2}px`;
  };

  return (
    <div
      className="flex items-center gap-2 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <span>View</span>

      <div
        ref={trackRef}
        className="w-24 h-px bg-gray-400 relative cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full transition-all"
          style={{ left: getCircleLeft() }}
        />
      </div>
    </div>
  );
}

export default ViewController;
