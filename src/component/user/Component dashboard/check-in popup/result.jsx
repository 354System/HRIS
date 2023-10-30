import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Result = ({ datas, checkInPopUp }) => {

  const handleClose = () => {
    checkInPopUp(false);
  };

  return (
    <div className="absolute w-full h-full inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="absolute top-28 transform -translate-y-1/2 bg-white p-8 w-[632px] h-[750px] rounded-lg mt-8">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center"
          >
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-[#2F2F2F] font-semibold text-xl">
            Success Attendance
          </h1>
          <h1 className="text-[#ACACAC] font-normal text-xs">
            Select Your Check - In Type
          </h1>
        </div>
        <div className="w-full h-auto mt-4">
          {datas && <img src={URL.createObjectURL(datas.filePhoto)} alt="Screenshot" className="rounded-lg" />}
        </div>
        <div className="flex mt-6 gap-x-24">
          <div className="text-[#252C58]">
            <h1>Time Attendance:</h1>
            <h1 className="font-semibold">{datas.times}</h1>
          </div>
          <div className="text-[#252C58]">
            <h1>Date:</h1>
            <span className="font-semibold">{datas.date}</span>
          </div>
          <div className="text-[#252C58]">
            <h1>Type:</h1>
            <h1 className="font-semibold">{datas.status}</h1>
          </div>
        </div>
        <div>
          <button onClick={handleClose} className="bg-[#A332C3] mt-10 w-full h-[50px] text-white font-semibold rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
