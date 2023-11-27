import { FaPen, FaTrash } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoMdEye } from "react-icons/io";
import { useFetchWikiDocument } from "../../../api/wiki document/useFetchWikiDocument";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useEffect, useState } from "react";
import { Modal, ModalBody } from "@chakra-ui/react";
const WikiDocumentBodyAdmin = () => {
    const { data: wikiData, isLoading, isError } = useFetchWikiDocument()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const bufferToURL = (buffer, mimetype) => {
        const blob = new Blob([buffer], { type: mimetype });
        return URL.createObjectURL(blob);
    };

    useEffect(() => {
        return () => {
            // Membersihkan sumber daya ketika komponen di-unmount
            if (wikiData) {
                wikiData.forEach((data) => {
                    URL.revokeObjectURL(data.file);
                });
            }
        };
    }, [wikiData]);
console.log(wikiData);
    return (
        <div className="w-full px-5 bg-white rounded-b-lg">
            <table className="w-full">
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
                            <td className="text-[#252C58] p-4">{data?.file?.data?.title?.originalname}</td>
                            <td className="flex gap-x-1 justify-end p-4">
                                <button className="group w-10 h-10 flex justify-center items-center rounded-lg mb-4 bg-purple text-white hover:bg-purple-dark transition-colors duration-200 ease-in-out">
                                    <IoMdEye onClick={() => setIsModalOpen(true)} size={20} className="group-hover:scale-125 duration-200 transition-transform" />
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
                            <Modal>
                                <ModalBody>
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                        <Viewer
                                            fileUrl={bufferToURL(data.file, data.mimetype)}
                                        />
                                    </Worker>
                                </ModalBody>
                            </Modal>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    )
}
export default WikiDocumentBodyAdmin;