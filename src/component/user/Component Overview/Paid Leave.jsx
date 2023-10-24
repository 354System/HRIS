import { Icon } from "@iconify/react";
const PaidLeave = () => {
  return (
    <div className="w-60 h-full flex flex-col justify-between bg-purple rounded p-5">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-white">
          <span>30</span>
        </div>
        <div className="rounded-full bg-grey w-10 h-10 flex items-center justify-center">
          <Icon icon="mdi:weather-time" color="white" width="28" />
        </div>
      </div>
      <div>
        <span className="text-base text-white font-bold">Paid Leave</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#FFFFFF] flex items-center justify-center rounded-full">
            <img
              src="src/assets/Vector1.svg"
              alt=""
              className="text-[#43900C]"
            />
          </div>
          <div>
            <span className="text-xs text-[#FFFFFF]">
              -10% Increase than yesterday
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidLeave;
