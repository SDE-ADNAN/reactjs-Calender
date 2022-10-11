import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import React from "react";
import Cell from "./Cell";
import "./calender.css";

const Calender = ({ value = new Date(), onChange, handleSetToday }) => {
  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;
  const month = value.getMonth();
  const year = value.getFullYear();

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => onChange(sub(value, { months: 1 }));
  const nextMonth = () => onChange(add(value, { months: 1 }));

  const prevMonthDays = format(endOfMonth(sub(value, { months: 1 })), "dd");
  const firstDays = prevMonthDays - prefixDays;

  //   const lastDayOfMonth = format(endOfMonth(date), "dd");
  const handleClickDate = (index) => {
    console.log(index);

    // window.localStorage.setItem(`${}`, index);
    const date = setDate(value, index);
    onChange(date);
  };

  // Lists of 2nd and 4th saturdays of the month
  function getSaturdays(year, month) {
    let day, date;
    let saturdays = [];
    day = 1;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
      if (date.getDay() === 6) {
        // Sun=0, Mon=1, Tue=2, etc.
        saturdays.push(new Date(year, month, day).getDate());
      }
      day += 1;
      date = new Date(year, month, day);
    }
    return saturdays;
  }
  let saturdays = getSaturdays(year, month).filter(
    (day, index) => index % 2 !== 0
  );

  const localStorageHolidays = (day) => {};
  const localStorage = window.localStorage;
  localStorage.setItem("saturdays", saturdays);
  console.log(localStorage.getItem("saturdays"));

  return (
    <div className="w-full border-t border-l">
      <div className="grid grid-cols-7 items-center justify-center text-center">
        <Cell className="col-span-2">
          <div
            onClick={prevMonth}
            className="bg-sky-600 text-gray-50 p-2 rounded m-1"
          >
            Previous
          </div>
          <div onClick={() => handleSetToday()} className="">
            Today
          </div>
          <div
            onClick={nextMonth}
            className="bg-sky-600 text-gray-50 p-2 rounded m-1"
          >
            Next
          </div>
        </Cell>
        <Cell className="col-span-3 text-5xl font-medium">
          {months[month]} {year}
        </Cell>
        <Cell className="col-span-2 ">
          <div className=" bg-sky-600 text-gray-50 p-2 rounded m-1">
            Add Holiday
          </div>
        </Cell>
        {weeks.map((week, index) => (
          <div key={index} className="text-base font-bold">
            {week}
          </div>
        ))}
        {Array.from({ length: prefixDays }).map((_, index) => (
          <Cell className="opacity-30 relative calender-cell-grid" key={index}>
            <div className="absolute right-2 top-2">
              {firstDays + index + 1}
            </div>
          </Cell>
        ))}
        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          const isCurrentDate = date === value.getDate();
          const isToday = date === value.getDate();
          const isBankHoliday = saturdays.includes(date);

          return (
            <Cell
              key={date}
              isActive={isCurrentDate}
              isBankHoliday={isBankHoliday}
              onClick={() => handleClickDate(date)}
              className="relative calender-cell-grid"
            >
              <div
                className={`absolute right-2 top-2 ${
                  isToday ? "text-3xl font-bold text-sky-600" : ""
                }`}
              >
                {date}
              </div>
              {isBankHoliday && (
                <div className=" absolute w-3 h-3 rounded-full bg-yellow-400 bottom-2 left-2"></div>
              )}
              {isBankHoliday && (
                <div className=" absolute w-4 h-4 rounded-full bg-red-600 top-4 left-50% right-50%">
                  <div className="width-full text-neutral-200 text-xs font-bold">
                    1
                  </div>
                </div>
              )}
            </Cell>
          );
        })}
        {Array.from({ length: suffixDays }).map((_, index) => (
          <Cell className="opacity-30 relative calender-cell-grid" key={index}>
            <div className="absolute right-2 top-2">{index + 1}</div>
          </Cell>
        ))}
      </div>
    </div>
  );
};

export default Calender;
