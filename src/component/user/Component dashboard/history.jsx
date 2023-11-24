import React from "react";
import { Icon } from "@iconify/react";

const Histori = () => {
  
  return (
    <div className="w-full bg-white">
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
              <td className="text-[#252C58] p-4">29 July 2023</td>
              <td className="bg-white"><span className="text-[#A332C3] bg-[#E6EFFC] p-1">Work from office</span></td>
              <td className="text-[#A332C3] ml-4">09:00</td>
              <td className="text-[#A332C3]">18:00</td>
              <td className="text-[#252C58]">10h 2m</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="border-b">
              <td className="text-[#252C58] p-4">28 July 2023</td>
              <td className=" bg-white"><span className="bg-[#FFE5EE] text-[#AA0000] p-1">Absent</span></td>
              <td className="text-[#AA0000]">00:00</td>
              <td className="text-[#AA0000]">00:00</td>
              <td className="text-[#AA0000]">0m</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="border-b">
              <td className="text-[#252C58] p-4">27 July 2023</td>
              <td className="bg-white"><span className="text-[#D5B500] bg-[#FFF8E7] p-1">Late Arrival</span></td>
              <td className="text-[#D5B500]">10:30</td>
              <td className="text-[#A332C3]">18:00</td>
              <td className="text-[#252C58]">8h 30m</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Histori;
