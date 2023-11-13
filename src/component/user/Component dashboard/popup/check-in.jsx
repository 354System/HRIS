import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Camera from "./camera";
import Wfo from "./Wfo";

const CheckIn = ({checkInPopUp}) => {

  const [WFO, setWFO] = useState(false)
  const [WFH, setWFH] = useState(false)
  const [status, setStatus] = useState('')

  const handleCheckinWFO = () => {
    setWFO(true);
    setStatus('Work From Office')
  };

  const handleCheckinWFH = () => {
    setWFH(true);
    setStatus('Work From Home')
  }

q 
  const handleClose = () => {
    checkInPopUp(false)
  }
  
  return (
    <div className="absolute w-full h-full inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-8 w-[684px] h-[394px] rounded-lg">
        <div className="flex justify-end">
          <button onClick={handleClose} className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center">
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
            <button onClick={handleCheckinWFO} className="flex justify-center items-center bg-[#A332C3] w-[123px] h-[123px] rounded-full">
              <Icon icon="solar:city-outline" width="42.17" color="white" />
            </button>
            {WFO ? <Camera WFO={setWFO} status={status} checkInPopUp={checkInPopUp}/> : null}
            <h1 className="text-center text-[#252C58] font-bold">
              Work From Office
            </h1>
          </div>
          <div>
            <button onClick={handleCheckinWFH} className="flex justify-center items-center bg-[#DBDBDB] w-[123px] h-[123px] rounded-full">
              <Icon icon="solar:home-linear" color="white" width="42.17" />
            </button>
            {WFH ? <Wfo WFO={setWFH} status={status} checkInPopUp={checkInPopUp}/> : null}
            <h1 className="text-center text-[#252C58] font-bold">
              Work From Home
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
