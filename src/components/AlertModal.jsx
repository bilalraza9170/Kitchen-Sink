import React from "react";
import "./AlertModal.css"; // Import the CSS file

const AlertModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h1>Alert</h1>
          <p>{message}</p>
          <button className="ok-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
