import { FiUsers } from "react-icons/fi";
const ApprovePaidLeaveAdmin = ({ paidLeaveData }) => {
  const data = paidLeaveData?.filter((data) => data.approval === "Approved");
  return (
    <div className="w-64 h-full flex flex-col bg-white justify-between rounded p-5">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-primary">
          <span>{data?.length}</span>
        </div>
        <div className="rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center">
          <FiUsers size={20} color='purple' />
        </div>
      </div>
      <div>
        <span className="text-base text-primary font-bold">Approved</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#97CE71] flex items-center justify-center rounded-full">
            <p className="text-xs text-[#43900C]">+</p>
          </div>
          <div>
            <span className="text-xs text-grey">2 new employees added!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovePaidLeaveAdmin;
