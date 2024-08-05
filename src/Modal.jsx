import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, children }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
