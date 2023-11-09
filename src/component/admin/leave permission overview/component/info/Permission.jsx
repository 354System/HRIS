import { Icon } from "@iconify/react";
const Permission = () => {
  return (
    <div className="w-64 h-full flex flex-col justify-between bg-[#F9BE2A] rounded p-5">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-white">
          <span>42</span>
        </div>
        <div className="rounded-full bg-grey w-10 h-10 flex items-center justify-center">
          <Icon icon="fluent-mdl2:date-time-2" color="white" width="20" />
        </div>
      </div>
      <div>
        <span className="text-base text-white font-bold">Permission</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#ffff] flex items-center justify-center rounded-full p-1">
            <img src="src/assets/Vector.svg" alt="" />
          </div>
          <div>
            <span className="text-xs text-white">
              +3% Increase than yesterday
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permission;
