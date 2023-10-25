import React from 'react';
import '../styles/modal.scss'; 

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" data-testid="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
