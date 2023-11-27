import { IoIosAdd, IoMdClose } from "react-icons/io";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { GrDocumentPdf } from "react-icons/gr";
import { useRef, useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { textInputTheme } from "../../../../../lib/flowbiteTheme";
import { useCreateWikiDocument } from "../../../../../api/wiki document/useCreateWikiDocument";

const AddWikiDocument = ({ setAddDocumentPopUp }) => {
    const [errorMsg, setErrorMsg] = useState({
        input: '',
        file: ''
    })
    const [documentData, setDocumentData] = useState({
        name: '',
        file: null,
    })

    const handleInputChange = (e) => {
        setDocumentData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const fileinput = useRef(null)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedExtensions = ["pdf"];
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                // Memasukkan informasi file ke dalam documentData
                setErrorMsg((prevError) => ({
                    ...prevError,
                    file: '',
                }))
                setDocumentData((prevState) => ({
                    ...prevState,
                    file: selectedFile,
                }));
            } else {
                setErrorMsg((prevError) => ({
                    ...prevError,
                    file: "File must be .pdf",
                }))
                e.target.value = "";
            }
        }
    };

    const validateInput = () => {
        if (documentData.name === '' || documentData.file === null) {
            setErrorMsg((prevError) => ({
                ...prevError,
                input: "Please fill in the required fields",
            }))
        }
    }

    const { mutate, isPending } = useCreateWikiDocument({
        onSuccess: (data) => {
            console.log(data);
            setAddDocumentPopUp(false)
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleSubmit = (e) => {
        const { name, file } = documentData;
        
        const formData = new FormData();
        formData.append('title', name);
        formData.append('image', file);

        mutate(formData);
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 bg-black/50 w-full h-full">
            <div className="fixed top-1/2 transform -translate-y-1/2 bg-white p-4 w-1/2 h-[60%] rounded-lg flex flex-col">
                <div className="absolute top-0 right-0 -mr-3 -mt-3">
                    <button
                        onClick={() => setAddDocumentPopUp(false)}
                        className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
                        <IoMdClose size={20} color="white" />
                    </button>
                </div>
                <div className="w-full flex items-center gap-2 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-purple rounded-full">
                        <HiOutlineDocumentAdd size={20} color="white" />
                    </div>
                    <h1 className="text-lg">Add Document</h1>
                </div>
                <div className="w-full">
                    <form>
                        <div className="block mb-2">
                            <Label htmlFor="name">Name Document</Label>
                        </div>
                        <TextInput color={documentData.name ? "success" : "gray"}
                            type="text" className="w-full h-10 mb-4"
                            placeholder="Name Document" id="name"
                            value={documentData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="block mb-2">
                            <Label htmlFor="file" value="Upload File Document" />
                        </div>
                        <div className="flex flex-col gap-2 mb-8 h-14" onClick={() => fileinput.current.click()}>
                            <TextInput
                                theme={textInputTheme}
                                color={documentData.file ? "success" : "gray"}
                                className="w-full h-10 cursor-pointer"
                                type="text" value={documentData.file ? documentData.file.name : ''}
                                id="file" ref={fileinput}
                                onChange={handleFileChange}
                                icon={GrDocumentPdf}
                                rightIcon={IoIosAdd}
                                readOnly
                                placeholder="Upload File Document"
                            />
                            <input
                                type="file"
                                hidden
                                ref={fileinput}
                                onChange={handleFileChange}
                            />
                            {errorMsg.file && <p className="text-sm text-red-500">{errorMsg.file}</p>}
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <p className="text-red-500">{errorMsg.input}</p>
                            <button onClick={handleSubmit} className="w-24 h-10 text-base rounded-lg text-white bg-purple hover:bg-purple-dark transition-colors duration-200" type="button">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddWikiDocument;