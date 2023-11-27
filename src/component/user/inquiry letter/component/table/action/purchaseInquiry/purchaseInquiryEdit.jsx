import { BsCalendar2DateFill, BsFileEarmarkCheck } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { createDatePickerTheme } from "../../../../../../../lib/flowbiteTheme";
import { format } from "date-fns";
import { usePurchaseInquiryEdit } from "../../../../../../../api/inquiry letter/usePurchaseInquiryEdit";
import { TbDeviceIpadHorizontal, TbFilePencil } from "react-icons/tb";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoMdAddCircleOutline, IoMdClose } from "react-icons/io";
import { useRef, useState } from "react";
import { Datepicker, Flowbite, TextInput, Textarea } from "flowbite-react";

const PurchaseInquiryEditUser = ({ data, setEditModal }) => {
    const [errorMsg, setErrorMsg] = useState({
        input: '',
        file: ''
    })

    const [newData, setNewData] = useState({
        title: data.title,
        date: format(new Date(data.date), "MMMM dd, yyyy"),
        name: data.name,
        reason: data.reason,
        cost: data.cost,
        upload: null
    })

    const fileinput = useRef(null)

    const handleInputChange = (e) => {
        setNewData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedExtensions = ["jpg", "png", "pdf"];
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                // Simpan file ke state newData jika diperlukan
                setNewData((prevnewData) => ({
                    ...prevnewData,
                    upload: selectedFile
                }));
            } else {
                setErrorMsg((prevState) => ({
                    ...prevState,
                    file: "File must be .jpg, .png, atau .pdf"
                }))
                e.target.value = "";
            }
        }
    };

    const { mutate, isPending } = usePurchaseInquiryEdit({
        onSuccess: (data) => {
            console.log(data);
            setEditModal(false)
        },
        onError: (error) => {
            console.log(error);
            setErrorMsg((prevState) => ({
                ...prevState,
                input: error.response.data.message
            }))
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const { title, date, name, reason, cost } = newData

        mutate({
            title,
            date: new Date(date),
            name,
            reason,
            cost,
        })
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 bg-black/60 w-full h-full cursor-default">
            <div className="fixed overflow-y-auto top-1/2 transform -translate-y-1/2 bg-white p-5 w-1/2 h-4/5 rounded-lg flex flex-col">
                <div className="absolute top-2 right-2 ">
                    <button
                        onClick={() => setEditModal(false)}
                        className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
                        <IoMdClose size={20} color="white" />
                    </button>
                </div>
                <div className=" flex items-center mb-4">
                    <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <TbFilePencil size={30} />
                    </div>
                    <div className="flex flex-col px-2">
                        <span className="font-semibold">Form Purchase Inquiry</span>
                    </div>
                </div>
                <form className="p-2">
                    <Flowbite theme={{ theme: createDatePickerTheme }} className="cursor-none">
                        <div className="mb-4">
                            <TextInput
                                id="title"
                                value={newData.title}
                                onChange={handleInputChange}
                                sizing={"md"}
                                placeholder="Title"
                                icon={HiOutlineDocumentText}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Datepicker
                                type="text"
                                placeholder="Select date"
                                id="date"
                                value={newData.date}
                                showTodayButton={false}
                                showClearButton={false}
                                onSelectedDateChanged={date => setNewData(prevnewData => ({ ...prevnewData, date: format(date, 'MMMM dd, yyyy') }))}
                                rightIcon={BsCalendar2DateFill}
                                icon={false}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                id="name"
                                value={newData.name}
                                onChange={handleInputChange}
                                sizing={"md"}
                                icon={TbDeviceIpadHorizontal}
                                placeholder="Item Name"
                                required />
                        </div>
                        <div className="mb-4">
                            <Textarea
                                id="reason"
                                value={newData.reason}
                                onChange={handleInputChange}
                                rows={3}
                                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 "
                                placeholder='Reason for Purchase'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                id="cost"
                                value={newData.cost}
                                onChange={handleInputChange}
                                sizing={"md"}
                                className="w-full h-10"
                                icon={AiOutlineDollarCircle}
                                placeholder="Estimated Costs"
                                required />
                        </div>
                        <div className="mb-8" onClick={() => fileinput.current.click()}>
                            <TextInput value={newData?.upload?.name} className="w-full cursor-pointer" icon={BsFileEarmarkCheck} rightIcon={IoMdAddCircleOutline} placeholder="Upload Attachments" />
                            <input
                                type="file"
                                accept=".pdf"
                                id="file_input"
                                className="hidden"
                                ref={fileinput}
                                onChange={handleFileChange}
                            />
                        </div>
                        {errorMsg.file && <p className="text-red-500">{errorMsg.input}</p>}
                        <div className="flex justify-between items-center">
                            <div>
                                {errorMsg.input && <p className="text-red-500">{errorMsg.input}</p>}
                            </div>
                            <div className="flex gap-x-4 items-center">
                                <h1 onClick={() => setEditModal(false)} className="font-semibold cursor-pointer" >
                                    Cancel
                                </h1>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="flex justify-center items-center bg-purple hover:bg-purple-dark transition-colors duration-200 w-32 h-12 rounded-lg text-white font-semibold focus:outline-none enabled:outline-none"
                                >
                                    {isPending ? <Spinner /> : 'Send Request'}
                                </button>
                            </div>
                        </div>
                    </Flowbite>
                </form>
            </div>
        </div>
    )
}
export default PurchaseInquiryEditUser;