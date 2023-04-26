import React from "react";
import Loading from "./Loading";

const Progress_bar = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <Loading />
    </div>
  );
};

export default Progress_bar;
