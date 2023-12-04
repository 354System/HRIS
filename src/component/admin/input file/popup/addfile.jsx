import { Icon } from "@iconify/react"
import { useRef, useState } from "react";



const AddFile = () => {

    const fileinput = useRef(null)
    const [file, setFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    

    // const handleUpload = () => {
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('image', file);

    //         fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/form/file', {
    //             method: 'POST',
    //             body: formData,
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log('File uploaded successfully:', data);
    //             })
    //             .catch(error => {
    //                 console.error('Error uploading file:', error);
    //             });
    //     } else {
    //         console.error('No file selected');
    //     }
    // };


    return (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-[740px]">
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[667px] h-[400px] rounded-lg flex flex-col">
                <div className="flex justify-end">
                    <button
                        className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center"
                    >
                        <Icon icon="ion:close" color="white" width="17.44" />
                    </button>
                </div>
                <div className=" flex items-center">
                    <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <Icon icon="mingcute:user-add-fill" />
                    </div>
                    <div className="flex flex-col px-2">
                        <span className="font-semibold">Add-File</span>
                    </div>
                </div>
                <div className="mt-2 flex">
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="username"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name"
                    />
                </div>
                <div className=" mt-2 gap-x-6 ">
                    <div className="mt-4 flex  gap-3 w-full relative items-center">
                        <div className="bg-[#ACACAC]/50 w-[70px] h-[50px] rounded-lg flex items-center justify-center">
                            <Icon icon="solar:bill-check-linear" width="21.95" onClick={() => fileinput.current.click()} className="cursor-pointer" />
                        </div>
                        <Icon icon="ri:add-circle-fill" width="21.44" className="absolute left-0 top-0 mt-8 ml-12 cursor-pointer" onClick={() => fileinput.current.click()} />
                        <input
                            type="file"
                            id="file_input"
                            className="hidden"
                            ref={fileinput}
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                if (selectedFile) {
                                    const allowedExtensions = ["jpg", "png", "pdf"];
                                    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

                                    if (allowedExtensions.includes(fileExtension)) {
                                        setSelectedFileName(selectedFile.name);
                                        setFile(selectedFile); // Tambahkan ini untuk mengatur nilai file
                                    } else {
                                        alert("Hanya file dengan ekstensi .jpg, .png, dan .pdf yang diizinkan.");
                                        e.target.value = "";
                                    }
                                }
                            }}
                        />

                        <div className="bg-[#ACACAC]/50 w-full h-[50px] flex items-center px-2">
                            {selectedFileName ? (
                                <p className="text-white" placeholder="Unggah File">{selectedFileName}</p>
                            ) : (
                                <p className="text-gray-400" placeholder="Unggah File">Enter the selected file</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-end flex justify-end gap-x-8 mt-20">
                    <h1
                        className="mt-[11px] font-semibold cursor-pointer"
                    >
                        Cancel
                    </h1>
                    <button
                        className="bg-[#A332C3] w-[155px] h-[46px] rounded-lg text-white font-semibold"
                    >
                        Add User
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddFile;