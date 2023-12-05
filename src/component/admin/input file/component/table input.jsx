import { Icon } from "@iconify/react";
import { useState } from "react";
import AddFile from "../popup/addfile";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


const TableInput = () => {

    const [addFile, setAddFile] = useState(false);


    const handlefile = () => {
        setAddFile(true)
    }


    return (
        <div className="bg-white hp:w-full ">
            <div className="p-5 ">
                <div className="flex justify-end">
                    <div className="ml-4">
                        <button
                            onClick={handlefile}
                            className="bg-[purple] w-[168px] h-[40px] rounded-lg flex items-center justify-center"
                        >
                            <Icon
                                icon="zondicons:add-solid"
                                width="24"
                                className="mr-2 text-[#FFFFFF]"
                            />
                            <span className="text-sm  text-white font-bold">Add Document</span>
                        </button>
                        {addFile ? <AddFile addFile={setAddFile} /> : null}
                    </div>
                </div>
            </div>
            <div className=" w-full text-left flex">
                <table className="w-full">
                    <thead className="">
                        <tr className="border-b-4 border-t-2 text-grey text-left">
                            <th className="p-4">Document</th>
                            <th className="flex justify-end p-4 laptop:mr-20 hp:mr-7">
                                <span>Status</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="text-[#252C58] p-4">File</td>
                            <td className="flex  gap-x-1 mt-4 justify-end laptop:mr-10 hp:mr-2 ">
                                <button className="bg-[#A332C3] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 hover:bg-[#5e1d70] transition-colors duration-200 ease-in-out">
                                    <Icon icon="mdi:eye" color="white" />
                                </button>
                                <button className="bg-[#F9BE2A] hover:bg-[#8e7534] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <Icon icon="mi:document-download" color="white" />
                                </button>
                                <button className="bg-blue-400 hover:bg-blue-600 laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <FaPen icon="mi:document-download" color="white" />
                                </button>
                                <button className="bg-red-500 hover:bg-[#980808] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <FaTrashAlt icon="mi:document-download" color="white" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr className="border-b">
                            <td className="text-[#252C58] p-4">File</td>
                            <td className="flex  gap-x-1 mt-4 justify-end laptop:mr-10 hp:mr-2">
                            <button className="bg-[#A332C3] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 hover:bg-[#5e1d70] transition-colors duration-200 ease-in-out">
                                    <Icon icon="mdi:eye" color="white" />
                                </button>
                                <button className="bg-[#F9BE2A] hover:bg-[#8e7534] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <Icon icon="mi:document-download" color="white" />
                                </button>
                                <button className="bg-blue-400 hover:bg-blue-600 laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <FaPen icon="mi:document-download" color="white" />
                                </button>
                                <button className="bg-red-500 hover:bg-[#980808] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <FaTrashAlt icon="mi:document-download" color="white" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr className="border-b">
                            <td className="text-[#252C58] p-4">File</td>
                            <td className="flex  gap-x-1 mt-4 justify-end laptop:mr-10 hp:mr-2">
                            <button className="bg-[#A332C3] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 hover:bg-[#5e1d70] transition-colors duration-200 ease-in-out">
                                    <Icon icon="mdi:eye" color="white" />
                                </button>
                                <button className="bg-[#F9BE2A] hover:bg-[#8e7534] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <Icon icon="mi:document-download" color="white" />
                                </button>
                                <button className="bg-blue-400 hover:bg-blue-600 laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <FaPen icon="mi:document-download" color="white" />
                                </button>
                                <button className="bg-red-500 hover:bg-[#980808] laptop:w-10 laptop:h-10 hp:w-7 hp:h-7 flex justify-center items-center rounded-lg text-center mb-4 transition-colors duration-200 ease-in-out">
                                    <FaTrashAlt icon="mi:document-download" color="white" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableInput;