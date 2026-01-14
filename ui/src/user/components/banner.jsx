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
      <img src="https://static.zarahome.net/assets/public/2999/6c9d/61324e788958/7e5d9e406521/noventa_ww/noventa_ww.jpg?ts=1740560261257&update=202503201755&w=1920" alt="" />
    </div>
  );
}

export default Banner;
