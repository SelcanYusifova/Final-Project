import React from "react";

function Banner() {
  return (
    <div className="banner">
      <video
        src="/videos/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default Banner;
