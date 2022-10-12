/* eslint-disable */
import React from "react";

const Cell = ({
  onClick,
  children,
  className,
  isActive = false,
  isBankHoliday = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} ${
        isBankHoliday ? "bg-emerald-200" : " "
      } border-t-2  relative border-b-2 border-r-2 flex items-center justify-center select-none w-auto h-[5rem]`}
    >
      {children}
    </div>
  );
};

export default Cell;
