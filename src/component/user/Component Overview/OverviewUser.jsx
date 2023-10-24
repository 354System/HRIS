import React from "react";
import { AiOutlineSearch, AiOutlineCalendar } from "react-icons/ai";

const OverView = () => {
  return (
    <div className="p-5 w-full bg-[#F9F9F9]">
      <div className="w-full bg-white p-5">
        <div className="flex mb-8">
          <div className="relative flex-1">
            <AiOutlineSearch
              className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 dark:text-gray-600"
              size={20}
            />
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10 pr-4 py-2 block w-[470px] h-[40px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Quick Search..."
              required
            />
          </div>
          <div className="ml-4">
            <button className="bg-[#D5D9DD] w-[133px] h-[40px] rounded-lg flex items-center justify-center">
              <AiOutlineCalendar className="mr-2" color="grey" size={20} />
              <p className="text-sm text-grey">29 July 2023</p>
            </button>
          </div>
          <div className="ml-4">
            <button className="bg-[purple] w-[168px] h-[40px] rounded-lg flex items-center justify-center">
              <img src="src/assets/Group 8866.png" className="mr-2" />
              <span className="text-sm font-thin text-white font-semibold">
                Advanced Filters
              </span>
            </button>
          </div>
        </div>
        <div className=" w-full text-center">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-t text-grey">
                <th className="p-4">ID</th>
                <th>Employee</th>
                <th>Role</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Work hours</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="text-[#252C58] p-4">2341421</td>
                <td className="text-[#252C58]">Ahmed Rashdan</td>
                <td className="text-grey">Help Desk Executive</td>
                <td className="text-grey">IT Department</td>
                <td className="text-grey">29 July 2023</td>
                <td className="bg-[#E6EFFC] text-purple ">Work from office</td>
                <td className="text-purple">09:00</td>
                <td className="text-purple">18:00</td>
                <td className="text-[#252C58]">10h 2m</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="border-b">
                <td className="text-[#252C58] p-4">2341421</td>
                <td className="text-[#252C58]">Ahmed Rashdan</td>
                <td className="text-grey">Help Desk Executive</td>
                <td className="text-grey">IT Department</td>
                <td className="text-grey">29 July 2023</td>
                <td className="bg-[#FFE5EE] text-[#AA0000]">Absent</td>
                <td className="text-[#AA0000]">00:00</td>
                <td className="text-[#AA0000]">00:00</td>
                <td className="text-[#AA0000]">0m</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="border-b">
                <td className="text-[#252C58] p-4">2341421</td>
                <td className="text-[#252C58]">Ahmed Rashdan</td>
                <td className="text-grey">Help Desk Executive</td>
                <td className="text-grey">IT Department</td>
                <td className="text-grey">29 July 2023</td>
                <td className="bg-[#FFF8E7] text-[#D5B500] font-medium">Late arrival</td>
                <td className="text-[#D5B500]">10:30</td>
                <td className="text-[#A332C3]">18:00</td>
                <td className="text-[#252C58]">8h 30m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverView;
