import React from "react";

function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-white z-[5] flex items-center justify-center">
      <div className="relative overflow-hidden">
        <h1 className="logo">LUMERA</h1>

        <span className="logo-wipe"></span>
      </div>
    </div>
  );
}

export default FullScreenLoader;
