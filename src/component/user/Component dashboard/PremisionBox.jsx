import { Icon } from "@iconify/react";
import Permision from "./popup/permission";
import { useState } from "react";
import LeaveApplications from "./popup/leaveapplications";

const PremisionBox = () => {
  const [popUp, setPopUp] = useState(false)
  const [leave, setLeave] = useState(false)

  const handleLeave = () => {
    setLeave(true)
  }
  const handlePermision = () => {
    setPopUp(true)
  }

  return (
    <div className="w-60 2xl:w-80  h-full flex flex-col justify-between  rounded-lg gap-4">
      <div className="bg-[#A332C3] rounded-lg">
        <button onClick={handleLeave} className=" h-[56px] flex items-center  p-3 bg-purple text-center rounded-lg hover:bg-fuchsia-700 w-full">
          <Icon icon="solar:calendar-mark-outline" color="white" width="22" />
          <span className="text-white text-xs font-semibold px-4">
            Leave Applications
          </span>
        </button>
        {leave ? <LeaveApplications leave={setLeave} /> : null}
      </div>
      <div className="rounded-lg">
        <button onClick={handlePermision} className="w-full h-[56px] flex items-center  p-3 bg-[#F9BE2A] text-center rounded-lg hover:bg-[#FBB901]">
          <Icon
            icon="solar:alarm-turn-off-outline"
            color="white"
            width="22"
          />
          <span className="text-white text-xs font-semibold px-4">
            Permission
          </span>
        </button>
        {popUp ? <Permision popUp={setPopUp} /> : null}
      </div>
    </div>
  );
};

export default PremisionBox;
