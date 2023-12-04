import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Camera from "./capture-check-in";

const CheckIn = ({ CheckInPopUp, refetchPresence }) => {

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
    <>
      {WFO ? <Camera refetch={refetchPresence} status={status} checkInPopUp={CheckInPopUp} refetchPresence={refetchPresence} /> : 
        <div className="fixed w-full min-h-screen inset-0 flex items-center justify-center z-20 bg-black/60">
          <div className="fixed top-1/2 transform -translate-y-1/2 bg-white p-8 laptop:w-2/5 hp:w-11/12 laptop:h-80 hp:h-2/5 rounded-lg">
            <div className="absolute top-0 right-0 -mr-2 -mt-2">
              <button onClick={handleClose} className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
                <Icon icon="ion:close" color="white" width="17.44" />
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-[#2F2F2F] font-normal text-lg">Check-In</h1>
              <h1 className="text-[#ACACAC] font-normal">
                Select Your Check - In Type
              </h1>
            </div>
            <div className="flex items-center justify-center mt-6 gap-4">
              <div className="flex flex-col items-center gap-2 group">
                <button onClick={handleCheckinWFO} className="flex justify-center items-center laptop:w-32 laptop:h-32 hp:w-24 hp:h-24 bg-purple hover:bg-purple-dark transition-all duration-200 rounded-full transform group-hover:scale-105">
                  <Icon icon="solar:city-outline" width="42.17" color="white" />
                </button>
                <h1 className="text-center text-primary font-bold transition-all transform group-hover:scale-105">
                  Work From Office
                </h1>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <button className="flex justify-center items-center laptop:h-32 hp:w-24 hp:h-24 bg-purple hover:bg-purple-dark transition-all duration-200 laptop:w-32 rounded-full transform group-hover:scale-105">
                  <Icon icon="solar:home-linear" color="white" width="42.17" />
                </button>
                <h1 className="text-center text-primary font-bold transition-all transform group-hover:scale-105">
                  Work From Home
                </h1>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default CheckIn;
