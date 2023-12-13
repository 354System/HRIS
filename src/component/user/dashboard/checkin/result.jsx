import React from "react";
import { Icon } from "@iconify/react";

const Result = ({ datas, checkInPopUp }) => {
  return (
    <div className="fixed w-full min-h-screen inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="fixed top-1/2 transform -translate-y-1/2 bg-white p-6 laptop:w-[650px] laptop:h-[95%] hp:w-11/12 hp:min-h-2/3 rounded-lg">
        <div className="absolute right-0 top-0 -mr-2 -mt-2">
          <button
            onClick={() => checkInPopUp(false)}
            className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg"
          >
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="text-center laptop:mb-6 hp:mb-4">
          <h1 className="text-[#2F2F2F] font-semibold text-xl">Success Attendance</h1>
          <h1 className="text-[#ACACAC] font-normal text-xs">Select Your Check - In Type</h1>
        </div>
        <div className="flex items-center justify-center w-full h-2/3 laptop:mb-5 hp:mb-2">
          {datas && (
            <img
              src={URL.createObjectURL(datas.filePhoto)}
              alt="Screenshot"
              className="rounded-lg w-[85%] object-cover"
            />
          )}
        </div>
        <div className="w-full flex justify-between laptop:mb-2 hp:mb-4 hp:text-sm hp:gap-1">
          <div className="text-primary">
            <h1 className="text-sm">Time Attendance:</h1>
            <h1 className="font-semibold">{datas.times}</h1>
          </div>
          <div className="text-primary text">
            <h1>Date:</h1>
            <span className="font-semibold">{datas.date}</span>
          </div>
          <div className="text-primary">
            <h1>Type:</h1>
            <h1 className="font-semibold">{datas.status}</h1>
          </div>
        </div>
        <div className="">
          <button
            onClick={() => checkInPopUp(false)}
            className="bg-purple hover:bg-purple-dark active:scale-95 active:bg-purple-dark transition-colors duration-200 w-full h-10 text-white font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Result;
