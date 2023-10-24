import { Icon } from "@iconify/react";

const RejectPermission = () => {
  return (
    <div className="w-60 h-full flex flex-col justify-between bg-white rounded p-5">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-primary">
          <span>42</span>
        </div>
        <div className="rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center">
          <Icon icon="fluent-mdl2:date-time-12" color="#f9be2a" width="20" />
        </div>
      </div>
      <div>
        <span className="text-base text-primary font-bold">Reject</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#CCDDFA] flex items-center justify-center rounded-full">
            <img
              src="src/assets/Vector2.svg"
              alt=""
              className="text-[#A332C3]"
            />
          </div>
          <div>
            <span className="text-xs text-grey">-10% Less than yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectPermission;
