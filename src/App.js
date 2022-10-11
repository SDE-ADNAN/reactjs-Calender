import { useState } from "react";
import "./App.css";
import Calender from "./Components/Calender";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSetToday = () => setCurrentDate(new Date());
  return (
    <h1 className="">
      <Calender handleSetToday={handleSetToday} value={currentDate} onChange={setCurrentDate}/>
    </h1>
  );
}
