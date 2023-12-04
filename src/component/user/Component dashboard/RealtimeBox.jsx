import { Icon } from "@iconify/react";
import { BsSun } from "react-icons/bs";
import { useState, useEffect } from "react";
import CheckIn from "./popup/check-in";

const RealtimeInsightBox = ({checkInPopUp}) => {
  const [realtime, setRealtime] = useState("");
  const [date, setDate] = useState("");
  const [popUp, setPopUp] = useState(false)

  const handlePopup = () => {
    setPopUp(true);
  };

  const updateRealtime = () => {
    const time = new Date();
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const second = time.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const timeFormatted = `${hours}:${minutes}:${second} ${ampm}`;
    setRealtime(timeFormatted);

    const year = time.getFullYear();
    const month = time.toLocaleString("default", { month: "long" });
    const day = time.getDate().toString().padStart(2, "0");
    const dateFormatted = `${day} ${month} ${year}`;
    setDate(dateFormatted);
  };
  useEffect(() => {
    setInterval(() => {
      updateRealtime();
    }, 1000);
  }, []);

  return (
    <div className="w-80 h-full bg-white rounded flex flex-col justify-between items-center p-5 ml-2 ">
      <div className="flex gap-4 w-full items-center">
        <BsSun size={50} className="text-purple" />
        <div className="flex flex-col w-full">
          <span className="font-black text-2xl text-primary ">{realtime}</span>
          <span className="text-xs font-medium text-primary">
            Realtime Insight
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-col mb-4">
          <span className="text-lg text-primary">Time Attendance</span>
          <span className="text-lg text-primary font-bold">09:00</span>
        </div>
        <div className="flex flex-col mb-4">
          <span className="text-lg text-primary">Today:</span>
          <span className="text-lg text-primary font-bold">{date}</span>
        </div>
        <div className="">
          <button
            onClick={handlePopup}
            className="w-[198px] h-[37px] flex items-center rounded p-3 bg-purple hover:bg-fuchsia-700"
          >
            <Icon
              icon="streamline:interface-logout-circle-arrow-enter-right-logout-point-circle"
              color="white"
              width="22"
            />
            <span className="text-white text-xs font-bold px-10">Check-In</span>
          </button>
          {popUp ? <CheckIn checkInPopUp={setPopUp}/> : null}
        </div>
      </div>
    </div>
  );
};

export default RealtimeInsightBox;
