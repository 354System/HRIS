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
    <div className="laptop:w-80 h-full hp:w-full flex laptop:flex-col laptop:gap-6 hp:gap-4 ">
      <div className="hp:w-full laptop:w-full hp:h-14 rounded-lg">
        <button onClick={handleLeave} className="laptop:w-80 hp:w-full laptop:h-[56px] hp:h-full hp:gap-3 flex items-center p-3 bg-purple hover:bg-purple-dark transition duration-200 ease-in-out text-center rounded-lg">
          <Icon icon="solar:calendar-mark-outline" color="white" width="22" />
          <span className="text-white text-xs laptop:font-bold hp:font-semibold laptop:px-4">
            Leave Applications
          </span>
        </button>
      </div>
      <div className="rounded-lg hp:w-full laptop:w-full hp:h-14">
        <button onClick={handlePermision} className="laptop:w-80 hp:w-full laptop:h-[56px] hp:h-full hp:gap-3 flex items-center p-3 bg-yellow hover:bg-yellow-dark transition duration-200 ease-in-out text-center rounded-lg">
          <Icon
            icon="solar:alarm-turn-off-outline"
            color="white"
            width="22"
          />
          <span className="text-white text-xs laptop:font-bold hp:font-semibold laptop:px-4">
            Permission
          </span>
        </button>
      </div>
      {popUp ? <Permision popUp={setPopUp} /> : null}
      {leave ? <LeaveApplications leave={setLeave} /> : null}
    </div>
  );
};

export default PremisionBox;
