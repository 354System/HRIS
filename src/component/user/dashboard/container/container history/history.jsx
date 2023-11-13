import React from "react";
import { Icon } from "@iconify/react";
import {FiSearch} from 'react-icons/fi'

const HistoryDashboard = () => {
  return (
    <div className="w-full bg-white p-5 mt-10 rounded-lg">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl font-bold">Attendance History</h1>
        <div className="relative flex items-center gap-6">
          <div>
            <input
              type="text"
              id="search"
              placeholder="Quick Search..."
              className="w-96 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
            />
          </div>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch color='#9295AB' size={18} />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <table className="w-full">
          <thead className="">
            <tr className="border-b-4 border-t-2 text-grey text-left">
              <th className="p-4">Date</th>
              <th>
                <div className="flex items-center">
                  <span>Status</span>
                  <Icon
                    icon="bxs:up-arrow"
                    color="#20285a"
                    width="5.88"
                    rotate={2}
                    className="ml-1"
                  />
                </div>
              </th>
              <th className="flex items-center mt-4">
                Check-in
                <Icon
                  icon="bxs:up-arrow"
                  color="#20285a"
                  width="5.88"
                  rotate={2}
                  className="ml-1"
                />
              </th>
              <th>
                <div className="flex items-center">
                  <span>Check-out</span>
                  <Icon
                    icon="bxs:up-arrow"
                    color="#20285a"
                    width="5.88"
                    rotate={2}
                    className="ml-1"
                  />
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <span>Work hours</span>
                  <Icon
                    icon="bxs:up-arrow"
                    color="#20285a"
                    width="5.88"
                    rotate={2}
                    className="ml-1"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="text-primary p-4">29 July 2023</td>
              <td className="bg-white"><span className="text-purple bg-[#E6EFFC] p-1">Work from office</span></td>
              <td className="text-purple ml-4">09:00</td>
              <td className="text-purple">18:00</td>
              <td className="text-primary">10h 2m</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryDashboard;
