import React from "react";

const Cell = ({ onClick, children, className, isActive = false }) => {
  return (
    <div
      onClick={isActive ? onClick : null}
      className={`${className} h-10 border-b border-r flex items-center justify-center select-none transition-colors`}
    >
      {children}
    </div>
  );
};

export default Cell;
