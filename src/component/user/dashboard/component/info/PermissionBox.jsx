import { Icon } from "@iconify/react";
import { useState } from "react";
import LeaveApplications from "../../leave applications/leaveapplications";
import Permision from "../../permisson/permission";

const PermisionBoxUser = () => {
  const [popUp, setPopUp] = useState(false)
  const [leave, setLeave] = useState(false)

  const handleLeave = () => {
    setLeave(true)
  }
  const handlePermision = () => {
    setPopUp(true)
  }

  return (
    <div className="w-64 h-full flex flex-col justify-between  rounded-lg ">
      <div>
        <div className="bg-[#A332C3] rounded-lg">
          <button onClick={handleLeave} className="w-64 h-[56px] flex items-center  p-3 bg-purple text-center rounded-lg">
            <Icon icon="solar:calendar-mark-outline" color="white" width="22" />
            <span className="text-white text-xs font-bold px-4">
              Leave Applications
            </span>
          </button>
        </div>
      </div>
      <div className="mt-6">
        <div className="rounded-lg">
          <button onClick={handlePermision} className="w-64 h-[56px] flex items-center  p-3 bg-[#F9BE2A] text-center rounded-lg">
            <Icon
              icon="solar:alarm-turn-off-outline"
              color="white"
              width="22"
            />
            <span className="text-white text-xs font-bold px-4">
              Permission
            </span>
          </button>
        </div>
      </div>
      {popUp ? <Permision popUp={setPopUp} /> : null}
      {leave ? <LeaveApplications leave={setLeave} /> : null}
    </div>
  );
};

export default PermisionBoxUser;
