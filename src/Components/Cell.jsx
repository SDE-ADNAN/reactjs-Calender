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
      onClick={isActive ? onClick : null}
      className={`${className} ${
        isBankHoliday ? "bg-black" : " "
      } border-t-2 opacity-70  border-b-2 border-r-2 flex items-center justify-center select-none w-auto h-[5rem]`}
    >
      {children}
    </div>
  );
};

export default Cell;
