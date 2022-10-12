import React from "react";

import "./modal.css";
const Modal = (props) => {
  return (
    <>
      {props.isOpen && (
        <div className="modal-main">
          <div className="modal-inner slide-top">
            <div className="modal-content">
              <hr></hr>
              {props.children}
              <p>bank holiday</p>
              <p>bank holiday</p>
              <p>bank holiday</p>
              <p>bank holiday</p>
              <hr></hr>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="close-Modalbtn"
                onClick={() => props.setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
