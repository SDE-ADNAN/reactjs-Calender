/* eslint-disable */
import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import React, { useEffect, useRef } from "react";
import Cell from "./Cell";
import "./calender.css";
import Modal from "./Modal/Modal";
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

const Calender = ({ value = new Date(), onChange, handleSetToday }) => {
  const localStorage = window.localStorage;
  const [count, setCount] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [holidays, setHolidays] = React.useState([]);
  const [currDate, setCurrDate] = React.useState(0);
  const [monthsList, setMonthsList] = React.useState([]);

  const DateRef = useRef();

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

  const handleClickDate = (index) => {
    setIsOpen(true);
    const date = setDate(value, index);
    onChange(date);
    //
  };

  // Lists of 2nd and 4th saturdays of the month
  function getSaturdays(year, month) {
    let day, date;
    let saturdays = [];
    let saturdaysFull = [];
    day = 1;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
      if (date.getDay() === 6) {
        // Sun=0, Mon=1, Tue=2, etc.
        saturdays.push(new Date(year, month, day).getDate());
        saturdaysFull.push(new Date(year, month, day));
      }
      day += 1;
      date = new Date(year, month, day);
    }
    return [saturdays, saturdaysFull];
  }
  let [saturdays] = getSaturdays(year, month);

  let filteredSaturdays = saturdays.filter((_, index) => index % 2 !== 0);
  useEffect(() => {
    var data = [];
    data.push("Bank Holiday");
    filteredSaturdays.map((day) => {
      localStorage.setItem(
        // taking verymuch precison while setting key as its unique
        `${month + 1 < 10 ? +"0" + `${month + 1}` : month + 1}/${
          day < 10 ? +"0" + `${day}` : day
        }/${year}`,
        JSON.stringify([...data])
      );
    });
  }, []);

  const setData = (value) => {
    var dataArr = JSON.parse(localStorage.getItem(format(value, "MM/dd/yyyy")));
    if (dataArr === null) {
      let data2 = [];
      data2.push("Holiday added onClick");
      localStorage.setItem(
        `${format(value, "MM/dd/yyyy")}`,
        JSON.stringify([...data2])
      );
    } else {
      // if data is not null, add "added on click" str
      dataArr.push(" Holiday added onClick");
      localStorage.setItem(
        `${format(value, "MM/dd/yyyy")}`,
        JSON.stringify([...dataArr])
      );
    }
  };

  useEffect(() => {
    var date;
    var holidayArr;
    const dateSet = new Array(numDays);
    var monthsFromLocalStorage = [];
    Object.keys(localStorage).forEach((key) => {
      date = +(key.charAt(3) + key.charAt(4));
      let month = +(key.charAt(0) + key.charAt(1));
      monthsFromLocalStorage.push(month);
      holidayArr = localStorage.getItem(key);
      dateSet[date - 1] = JSON.parse(holidayArr);
    });
    setHolidays(dateSet);
    setMonthsList(monthsFromLocalStorage);
  }, [count, month]);
  return (
    <div className="w-full border-t border-l">
      <div className="grid grid-cols-7 items-center justify-center text-center">
        <Cell className="col-span-2">
          <div
            onClick={() => {
              prevMonth();
              setCount(count + 1);
            }}
            className="bg-sky-600 text-gray-50 p-2 rounded m-1"
          >
            Previous
          </div>
          <div
            onClick={() => {
              handleSetToday();
              setCount(count + 1);
            }}
            className=""
          >
            Today
          </div>
          <div
            onClick={() => {
              nextMonth();
              setCount(count + 1);
            }}
            className="bg-sky-600 text-gray-50 p-2 rounded m-1"
          >
            Next
          </div>
        </Cell>
        <Cell className="col-span-3 text-5xl font-medium">
          {months[month]} {year}
        </Cell>
        <Cell className="col-span-2 ">
          <div
            onClick={() => {
              setData(value);
              setCount(count + 1);
            }}
            className=" bg-sky-600 text-gray-50 p-2 rounded m-1"
          >
            Add Holiday
          </div>
        </Cell>
        {weeks.map((week, index) => (
          <div key={index} className="text-base font-bold">
            {week}
          </div>
        ))}
        {Array.from({ length: prefixDays }).map((_, index) => (
          <Cell
            className=" relative calender-cell-grid bg-slate-100 "
            key={index}
          >
            <div className="absolute right-2 opacity-20 top-2">
              {firstDays + index + 1}
            </div>
          </Cell>
        ))}
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          holidays={holidays}
          date={currDate}
        />
        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          //   setCurrDate(date);
          const isCurrentDate = date === value.getDate();
          const isToday = date === value.getDate();
          const isBankHoliday = filteredSaturdays.includes(date);
          const isValidMonth = monthsList.includes(
            +`${month + 1 < 10 ? +"0" + `${month + 1}` : month + 1}`
          );

          return (
            <>
              <Cell
                key={date}
                ref={DateRef}
                isActive={isCurrentDate}
                isBankHoliday={isBankHoliday}
                onClick={(e) => {
                  setCurrDate(+e.target.innerText);
                  handleClickDate(date, isBankHoliday);
                  setCount(count + 1);
                }}
                className={`relative calender-cell-grid ${
                  isToday ? " bg-orange-300" : ""
                }`}
              >
                <div
                  className={`absolute right-2 top-2  ${
                    isToday ? "text-3xl font-bold  text-red-800" : ""
                  }`}
                >
                  {date}
                </div>
                <div className="absolute isHoliday-flex bottom-1 left-1 block">
                  {isValidMonth && (
                    <>
                      {holidays[date - 1] !== undefined && (
                        <>
                          {isBankHoliday && (
                            <div className="  w-2 h-2 rounded-full  bg-indigo-500"></div>
                          )}
                          {holidays[date - 1].map((_, index) => (
                            <>
                              {!isBankHoliday && isValidMonth && (
                                <>
                                  <div
                                    key={index}
                                    className="  w-2 h-2 rounded-full bg-zinc-900"
                                  ></div>
                                </>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
                {isValidMonth && (
                  <>
                    {holidays[date - 1] !== undefined &&
                      holidays[date - 1].length > 0 && (
                        <div className=" absolute w-4 h-4 rounded-full bg-red-600 top-4 left-50% right-50%">
                          <div className="width-full text-neutral-200 text-xs font-bold">
                            {holidays[date - 1] !== undefined
                              ? holidays[date - 1].length
                              : 0}
                          </div>
                        </div>
                      )}
                  </>
                )}
              </Cell>
            </>
          );
        })}
        {Array.from({ length: suffixDays }).map((_, index) => (
          <Cell
            className=" relative calender-cell-grid bg-slate-100"
            key={index}
          >
            <div className="absolute  opacity-20 right-2 top-2">
              {index + 1}
            </div>
          </Cell>
        ))}
      </div>
    </div>
  );
};

export default Calender;
