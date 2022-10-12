import React from "react";

import "./modal.css";
const Modal = (props) => {
  console.log(props.date);
  console.log(props.holidays);
  return (
    <>
      {props.isOpen && (
        <div className="modal-main">
          <div className="modal-inner slide-top">
            <div className="modal-content">
              <hr></hr>
              {props.holidays[props.date - 1] === undefined && (
                <p>no holidays</p>
              )}
              {props.holidays[props.date - 1] !== undefined && (
                <>
                  {props.holidays[props.date - 1].map((holiday, index) => (
                    <p key={index}>{holiday}</p>
                  ))}
                </>
              )}

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
