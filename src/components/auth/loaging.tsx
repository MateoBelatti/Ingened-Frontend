import React from "react";
import "../../styles/components/loading.css";

interface Props {
  text?: string;
}

export const LoadingButton: React.FC<Props> = ({ text = "Cargando..." }) => {
  return (
    <div className="d-grid">
      <button className="btn loading-btn" disabled>
        <span className="spinner-border spinner-border-sm me-2"></span>
        <span className="loading-text">{text}</span>
        <span className="loading-glow"></span>
      </button>
    </div>
  );
};