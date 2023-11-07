import React from "react";
import { Icon } from "@iconify/react";

const UserHistori = () => {
  return (
    <div>
      <div className="">
        <div className="bg-white">
          <div className="flex justify-between">
            <div className="mt-8">
              <h1 className="ml-4 font-bold text-xl">Attendance Histori</h1>
            </div>
            <button className="bg-[#D5D9DD] w-[114px] h-[40px] rounded-lg text-grey flex items-center justify-center mt-6 mr-6">
              Status
              <Icon
                icon="bxs:up-arrow"
                color="#20285a"
                width="5.88"
                rotate={2}
                className="ml-1"
              />
            </button>
          </div>
          <div className=" w-full text-left flex mt-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b-4 border-t-2 text-grey">
                  <th className="p-4">Date</th>
                  <th className="flex items-center mt-4">
                    Status
                    <Icon
                      icon="bxs:up-arrow"
                      color="#20285a"
                      width="5.88"
                      rotate={2}
                      className="ml-1"
                    />
                  </th>
                  <th className="">
                    <div className="flex items-center">
                      <span>Check-In</span>
                      <Icon
                        icon="bxs:up-arrow"
                        color="#20285a"
                        width="5.88"
                        rotate={2}
                        className="ml-1"
                      />
                    </div>
                  </th>
                  <th className="">
                    <div className="flex items-center">
                      <span>Check-Out</span>
                      <Icon
                        icon="bxs:up-arrow"
                        color="#20285a"
                        width="5.88"
                        rotate={2}
                        className="ml-1"
                      />
                    </div>
                  </th>
                  <th className="">
                    <div className="flex text-end gap-x-2">
                      <span>Work hours</span>
                      <Icon
                        icon="bxs:up-arrow"
                        color="#20285a"
                        width="5.88"
                        rotate={2}
                        className="mt-[10px]"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="text-[#252C58] p-4">29 July 2023</td>
                  <td className="bg-white">
                    <span className="text-[#A332C3] bg-[#E6EFFC] p-1">
                      Work from office
                    </span>
                  </td>
                  <td className="text-[#A332C3] ml-4">09:00</td>
                  <td className="text-[#A332C3]">18:00</td>
                  <td className="text-[#252C58]">10h 2m</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="border-b">
                  <td className="text-[#252C58] p-4">28 July 2023</td>
                  <td className=" bg-white">
                    <span className="bg-[#FFE5EE] text-[#AA0000] p-1">
                      Absent
                    </span>
                  </td>
                  <td className="text-[#AA0000]">00:00</td>
                  <td className="text-[#AA0000]">00:00</td>
                  <td className="text-[#AA0000]">0m</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="border-b">
                  <td className="text-[#252C58] p-4">27 July 2023</td>
                  <td className="bg-white">
                    <span className="text-[#D5B500] bg-[#FFF8E7] p-1">
                      Late Arrival
                    </span>
                  </td>
                  <td className="text-[#D5B500]">10:30</td>
                  <td className="text-[#A332C3]">18:00</td>
                  <td className="text-[#252C58]">8h 30m</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="border-b">
                  <td className="text-[#252C58] p-4">27 July 2023</td>
                  <td className="bg-white">
                    <span className="text-[#8A8A8A] bg-[#EFEFEF] p-1">
                      Work from home
                    </span>
                  </td>
                  <td className="text-[#8A8A8A]">09:00</td>
                  <td className="text-[#8A8A8A]">18:00</td>
                  <td className="text-[#8A8A8A]">10h 5m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistori;
