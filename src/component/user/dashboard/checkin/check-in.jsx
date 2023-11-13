import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Camera from "./capture-check-in";

const CheckIn = ({ CheckInPopUp, refetch }) => {

  const [WFO, setWFO] = useState(false)
  const [status, setStatus] = useState('')

  const handleCheckinWFO = () => {
    setWFO(true);
    setStatus('Work From Office')
  };

  const handleClose = () => {
    CheckInPopUp(false)
  }

  return (
    <div className="absolute w-full h-full inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-8 w-1/2 h-96 rounded-lg">
        <div className="flex justify-end">
          <button onClick={handleClose} className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">

            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-[#2F2F2F] font-normal">Check-In</h1>
          <h1 className="text-[#ACACAC] font-normal">
            Select Your Check - In Type
          </h1>
        </div>
        <div className="flex items-center justify-center mt-6 gap-x-8">
          <div>
            <button onClick={handleCheckinWFO} className="flex justify-center items-center bg-purple w-[123px] h-[123px] rounded-full">
              <Icon icon="solar:city-outline" width="42.17" color="white" />
            </button>
            <h1 className="text-center text-primary font-bold">
              Work From Office
            </h1>
          </div>
          <div>
            <button className="flex justify-center items-center bg-[#DBDBDB] w-[123px] h-[123px] rounded-full">
              <Icon icon="solar:home-linear" color="white" width="42.17" />
            </button>
            <h1 className="text-center text-primary font-bold">
              Work From Home
            </h1>
            {WFO ? <Camera refetch={refetch} status={status} checkInPopUp={CheckInPopUp} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
