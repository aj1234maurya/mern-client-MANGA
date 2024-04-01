import React from "react";
import video from "../assets/video.mp4";

function Main() {
  return (
    <div className="main">
      <video src={video} autoPlay loop muted />
    </div>
  );
}

export default Main;
