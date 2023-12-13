import { FaPen, FaTrash } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoMdEye } from "react-icons/io";
import { useFetchWikiDocument } from "../../../api/wiki document/useFetchWikiDocument";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useEffect, useState } from "react";
import DetailWikiDocument from "./component/modal/detailDocument";
const WikiDocumentBodyAdmin = () => {
    const { data: wikiData, isLoading } = useFetchWikiDocument()
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full laptop:px-5 hp:p-5 bg-white rounded-b-lg hp:overflow-x-auto  ">
            <table className="laptop:w-full hp:w-[400px]">
                <thead>
                    <tr className="w-full border-t-2 border-b-2">
                        <th className="p-4 text-left">No</th>
                        <th className="p-4 text-left">Document</th>
                        <th className="p-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {wikiData ? wikiData.map((data, index) => (
                        <tr key={index} className="border-b">
                            <td className="text-[#252C58] p-4">{index + 1}</td>
                            <td className="text-[#252C58] p-4">{data.title}</td>
                            <td className="flex gap-x-1 justify-end p-4">
                                <button className="group w-10 h-10 flex justify-center items-center rounded-lg mb-4 bg-purple text-white hover:bg-purple-dark transition-colors duration-200 ease-in-out">
                                    <IoMdEye onClick={() => { setIsModalOpen(true), setSelectedItem(data) }} size={20} className="group-hover:scale-125 duration-200 transition-transform" />
                                </button>
                                <button className="group w-10 h-10 flex justify-center items-center mb-4 bg-yellow text-white hover:bg-yellow-dark rounded-lg transition-colors duration-200 ease-in-out">
                                    <HiOutlineDocumentDownload size={23} className="group-hover:scale-125 duration-200 transition-transform" />
                                </button>
                                <button className="group w-10 h-10 flex justify-center items-center rounded-lg mb-4 bg-blue-400 text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out">
                                    <FaPen size={17} className="group-hover:scale-125 duration-200 transition-transform" />
                                </button>
                                <button disabled={isLoading} className="group w-10 h-10 flex justify-center items-center rounded-lg mb-4 bg-red text-white hover:bg-red-darktransition-colors duration-200 ease-in-out">
                                    <FaTrash size={17} className="group-hover:scale-125 duration-200 transition-transform" />
                                </button>
                            </td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
            <DetailWikiDocument setIsOpen={setIsModalOpen} data={selectedItem} />
        </div>
    )
}
export default WikiDocumentBodyAdmin;