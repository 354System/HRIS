import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Button = () => {
  return (
    <div className="">
      <div className="flex gap-x-4">
        <div>
          <button className="bg-[#A332C3] text-white w-[119px] h-[40px] rounded-lg font-bold">
            Paid Leave
          </button>
        </div>
        <div>
          <button className="bg-[#D5D9DD] text-grey w-[119px] h-[40px] rounded-lg font-normal">
            Permission
          </button>
        </div>
        <div className="ml-80">
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
        </div>
      </div>
    </div>
  );
};

export default Button;
