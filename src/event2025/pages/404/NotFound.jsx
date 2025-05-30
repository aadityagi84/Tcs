import React from "react";
import { useNavigate } from "react-router-dom";
import { headerImages } from "../../imagesProvider/AllImages";

const NotFound = ({ link }) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(link || "/"); // Fallback to home if link is not provided
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#ffffff",
        padding: "0 20px",
      }}
    >
      <img
        src={headerImages.logo}
        alt="Google Logo"
        style={{ marginBottom: "20px" }}
      />

      <h1 style={{ fontSize: "96px", margin: "20px 0", color: "#202124" }}>
        404
      </h1>
      <p style={{ fontSize: "20px", marginBottom: "40px", color: "#5f6368" }}>
        The page you’re looking for isn’t here.
      </p>
      <button
        onClick={goHome}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#1a73e8",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
