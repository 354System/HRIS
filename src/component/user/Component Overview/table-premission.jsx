import React from "react";
import { Icon } from "@iconify/react";

const TablePremission = () => {
  return (
    <div>
      <div className="mt-2 ">
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b border-t text-grey text-left">
              <th className="p-4">ID</th>
              <th>
                <div className="flex items-center">
                  <span>Employee </span>
                </div>
              </th>
              <th className="flex items-center mt-4">
                Role
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
                  <span>Department</span>
                  <Icon
                    icon="bxs:up-arrow"
                    color="#20285a"
                    width="5.88"
                    rotate={2}
                    className="ml-1"
                  />
                </div>
              </th>
              <th>Total Days</th>
              <th>Start Days</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-left">
              <td className="text-[#252C58] p-4">2341421</td>
              <td className="text-[#252C58]">Ahmed Rashdan</td>
              <td className="text-grey ml-4">Help Desk Executive</td>
              <td className="text-grey">IT Department</td>
              <td className="text-grey">2 Days</td>
              <td className="text-[#A332C3]">18 August 2023</td>
              <td className="text-[#A332C3]">20 August 2023</td>
              <td className="flex  gap-x-1 mt-4">
                <button className="bg-[#57C125] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                  <Icon
                    icon="ph:check-circle-fill"
                    color="white"
                    width="17.36"
                  />
                </button>
                <button className="bg-[#FF0000] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                  <Icon
                    icon="solar:close-circle-bold"
                    color="white"
                    width="17.36"
                  />
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className="border-b text-left">
              <td className="text-[#252C58] p-4">2341421</td>
              <td className="text-[#252C58]">Ahmed Rashdan</td>
              <td className="text-grey ml-4">Help Desk Executive</td>
              <td className="text-grey">IT Department</td>
              <td className="text-grey">2 Days</td>
              <td className="text-[#A332C3]">18 August 2023</td>
              <td className="text-[#A332C3]">20 August 2023</td>
              <td className="flex  gap-x-1 mt-4">
                <button className="bg-[#57C125] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                  <Icon
                    icon="ph:check-circle-fill"
                    color="white"
                    width="17.36"
                  />
                </button>

                <button className="bg-[#FF0000] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                  <Icon
                    icon="solar:close-circle-bold"
                    color="white"
                    width="17.36"
                  />
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className="border-b text-left">
              <td className="text-[#252C58] p-4">2341421</td>
              <td className="text-[#252C58]">Ahmed Rashdan</td>
              <td className="text-grey ml-4">Help Desk Executive</td>
              <td className="text-grey">IT Department</td>
              <td className="text-grey">2 Days</td>
              <td className="text-[#A332C3]">18 August 2023</td>
              <td className="text-[#A332C3]">20 August 2023</td>
              <td className="flex  gap-x-1 mt-4">
                <button className="bg-[#57C125] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                  <Icon
                    icon="ph:check-circle-fill"
                    color="white"
                    width="17.36"
                  />
                </button>

                <button className="bg-[#FF0000] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                  <Icon
                    icon="solar:close-circle-bold"
                    color="white"
                    width="17.36"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePremission;
