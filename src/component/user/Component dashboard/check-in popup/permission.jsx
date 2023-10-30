import React from "react";
import { Icon } from "@iconify/react";

const Permision = (props) => {
  const { popUp } = props;

  const handleClose = () => {
    popUp(false);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-full">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[667px] h-[700px] rounded-lg flex flex-col">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center"
          >
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="flex">
          <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
            <Icon icon="solar:widget-add-outline" />
          </div>
          <div className="flex flex-col px-2 mt-2">
            <span className=" font-semibold">Permission</span>
          </div>
        </div>
        <div className="flex-col flex mt-9 ">
          <select
            id="permission"
            className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg font-semibold h-10"
          >
            <option selected>select Permission</option>
            <option value="Sick" className="font-semibold">
              Sick
            </option>
            <option value="Holiday" className="font-semibold">
              Holiday
            </option>
            <option value="Family event" className="font-semibold">
              Family Events
            </option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <div>
            <label
              htmlFor="default-input"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            ></label>
          </div>
          <input
            type="date"
            id="default-input"
            className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Date"
          />
           {/* <Icon
            icon="solar:calendar-date-bold"
            width="21.14"
            className="absolute mt-2 mr-2"
            onClick={() => document.getElementById("default-input").click()}
          />  */}
        </div>
        <div className="mt-4 flex justify-end">
          <div>
            <label
              htmlFor="default-input"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            ></label>
          </div>
          <input
            type="date"
            id="default-input"
            className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="End Date"
          />
          {/* <Icon
            icon="solar:calendar-date-bold"
            width="21.14"
            className="absolute mt-2 mr-2"
          /> */}
        </div>
        <div className="flex mt-2 gap-x-6">
          <div className="mt-4 flex justify-end gap-3 w-full">
            <div className="bg-[#ACACAC]/50 w-[70px] h-[50px] rounded-lg flex items-center justify-center">
              <Icon icon="eva:folder-add-fill" width="21.95"/>
            </div>
            <div>
              <label
                htmlFor="default-input"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
              ></label>
            </div>
            <input
              type="text"
              id="file_input"
              className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 justify-end"placeholder="Add Sick Note"
            />
            <Icon icon="ri:add-circle-fill" width="21.44" className="absolute mt-4 mr-2"/>
          </div>
        </div>
        <div className="flex mt-8 h-[135px]">
          <label
            for="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          </label>
          <input
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-[#ACACAC]/50 sm:text-md" placeholder="Description"
          ></input>
        </div>
        <div className="text-end flex justify-end gap-x-8 mt-20">
          <h1 onClick={handleClose} className="mt-[11px] font-semibold cursor-pointer">Cancel</h1>
          <button onClick={handleClose} className="bg-[#A332C3] w-[155px] h-[46px] rounded-lg text-white font-semibold">
            Send Permission
          </button>
        </div>
      </div>
    </div>
  );
};

export default Permision;
