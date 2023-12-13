import { Icon } from "@iconify/react";
import { useState } from "react";
import LeaveApplications from "../../leave applications/leaveapplications";
import Permision from "../../permisson/permission";

const LeaveAndPermissionButton = ({ refetchPaidLeave }) => {
  const [popUp, setPopUp] = useState(false)
  const [leave, setLeave] = useState(false)

  const handleLeave = () => {
    setLeave(true)
  }
  const handlePermision = () => {
    setPopUp(true)
  }

  return (
    <div className="laptop:w-2/6 h-full hp:w-full flex laptop:flex-col laptop:gap-6 hp:gap-4">
      <div className="hp:w-full laptop:w-full laptop:h-1/2 hp:h-14 rounded-lg ">
        <button onClick={handleLeave} className="focus:outline-none laptop:w-full hp:w-full laptop:h-full hp:h-full hp:gap-3 flex items-center p-3 active:scale-95 active:bg-purple-dark bg-purple hover:bg-purple-dark transition duration-200 ease-in-out text-center rounded-lg">
          <Icon icon="solar:calendar-mark-outline" color="white" width="22" />
          <span className="text-white text-xs laptop:font-bold hp:font-semibold laptop:px-4">
            Leave Applications
          </span>
        </button>
      </div>
      <div className="rounded-lg hp:w-full laptop:w-full laptop:h-1/2 hp:h-14">
        <button onClick={handlePermision} className="focus:outline-none laptop:w-full hp:w-full laptop:h-full hp:h-full hp:gap-3 flex items-center p-3 active:scale-95 active:bg-yellow-dark bg-yellow hover:bg-yellow-dark transition duration-200 ease-in-out text-center rounded-lg">
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
      {leave ? <LeaveApplications refetchPaidLeave={refetchPaidLeave} leave={setLeave} /> : null}
    </div>
  );
};

export default LeaveAndPermissionButton;
