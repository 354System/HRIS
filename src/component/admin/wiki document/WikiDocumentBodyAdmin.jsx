import { FaPen, FaTrash } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoMdEye } from "react-icons/io";
import { useFetchWikiDocument } from "../../../api/wiki document/useFetchWikiDocument";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { DefaultLayoutPlugin, defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useEffect, useState } from "react";
import DetailWikiDocument from "./component/modal/detailDocument";
const WikiDocumentBodyAdmin = () => {
    const { data: wikiData, isLoading, isError } = useFetchWikiDocument()
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [url, setUrl] = useState([]);
    const fileType = "application/pdf";
    useEffect(() => {
        if (wikiData) {
            // Mapping setiap objek Wiki
            wikiData.forEach((data) => {
                if (data.file && data.file.data && data.file.type === 'Buffer') {
                    // Convert buffer to base64
                    const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data.file.data)));
    
                    // Create base64 URL
                    const base64URL = `data:application/pdf;base64,${base64String}`;
    
                    // Set URL ke dalam state atau lakukan apa yang Anda perlukan
                    // Misalnya, simpan URL dalam bentuk array jika Anda ingin menyimpan URL untuk semua objek
                    // Jangan lupa mempertimbangkan cara terbaik untuk mengelola URL dalam aplikasi Anda
                    setUrl((prevUrls) => [...prevUrls, base64URL]);
                }
            });
        }
    }, [wikiData]);
    


    console.log(url);

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
                            {url && url.map((url, index) => (
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <Viewer fileUrl={url} plugins={[defaultLayoutPlugin]} />
                                </Worker>
                            ))
                            }
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