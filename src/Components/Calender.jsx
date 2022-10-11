import {
//   add,
  differenceInDays,
  endOfMonth,
  format,
//   setDate,
  startOfMonth,
  eachWeekendOfInterval,
  sub,
} from "date-fns";
import React from "react";
import Cell from "./Cell";
import "./calender.css";

var date = new Date(2022, 8, 11);
const Calender = ({ value = date, onChange }) => {
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
  const month = date.getMonth();
  const year = date.getFullYear();

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

//   const prevMonth = () => onChange(sub(value, { months: 1 }));
//   const nextMonth = () => onChange(add(value, { months: 1 }));

  const prevMonthDays = format(endOfMonth(sub(value, { months: 1 })), "dd");
  const firstDays = prevMonthDays - prefixDays;

//   const lastDayOfMonth = format(endOfMonth(date), "dd");
//   const handleClickDate = (index) => {
//     const date = setDate(value, index);
//     onChange(date);
//   };

  // Lists all Saturdays and Sundays in the given date interval
  
const result = eachWeekendOfInterval({
    start: date.setDate(1),
    end: date.setDate(endOfMonth(date).getDate()),
  })
  console.log(result);
  return (
    <div className="w-full border-t border-l">
      <div className="grid grid-cols-7 items-center justify-center text-center">
        <Cell className="col-span-2">
          <div className="bg-sky-600 text-gray-50 p-2 rounded m-1">
            Previous
          </div>
          <div className="">Today</div>
          <div className="bg-sky-600 text-gray-50 p-2 rounded m-1">Next</div>
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
          const isSaturday = result.includes(date);

          return (
            <Cell
              key={date}
              isActive={isCurrentDate}
              isSaturday={isSaturday}
              className="relative calender-cell-grid"
            >
              <div className="absolute right-2 top-2">{date}</div>
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
