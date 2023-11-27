import { useRef, useState } from "react";
import { IoMdAddCircleOutline, IoMdClose } from "react-icons/io";
import { TbFilePencil } from "react-icons/tb";
import { createDatePickerTheme } from "../../../../../../../lib/flowbiteTheme";
import { Datepicker, Flowbite, TextInput, Textarea } from "flowbite-react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsCalendar2DateFill, BsFileEarmarkCheck } from "react-icons/bs";
import { format } from "date-fns";
import { RiFileDamageLine } from "react-icons/ri";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useRepairInquiryEdit } from "../../../../../../../api/inquiry letter/useRepairInquiry";
import { Spinner } from "@chakra-ui/react";

const RepairInquiryEditUser = ({ data, setEditModal }) => {
    const [errorMsg, setErrorMsg] = useState({
        input: '',
        file: ''
    })

    const [newData, setNewData] = useState({
        title: data.title,
        date: format(new Date(data.date), "MMMM dd, yyyy"),
        chronology: data.chronology,
        damage: data.damage,
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
                setNewData((prevNewData) => ({
                    ...prevNewData,
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

    const { mutate, isPending } = useRepairInquiryEdit({
        id: data._id,
        onSuccess: (newData) => {
            console.log(newData);
            setRepairFormPopUp(false)
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
        const { title, date, chronology, damage, cost } = newData

        mutate({
            category: 'Repair',
            title,
            date: new Date(date),
            chronology,
            damage,
            cost,
        })
    }

    const textAreaTheme = {
        base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 text-sm",
        field: {
            icon: {
                base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
                svg: 'h-5 w-5 text-gray-500 dark:text-gray-400'
            }
        },
        colors: {
            gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
            info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
            failure: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
            warning: "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
            success: "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
        },
        withShadow: {
            on: "shadow-sm dark:shadow-sm-light",
            off: ""
        }
    }
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
                        <span className="font-semibold">Form Repair Inquiry</span>
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
                                placeholder="Select date"
                                id="date"
                                value={newData.date}
                                showTodayButton={false}
                                showClearButton={false}
                                onSelectedDateChanged={date => setNewData(prevNewData => ({ ...prevNewData, date: format(date, 'MMMM dd, yyyy') }))}
                                rightIcon={BsCalendar2DateFill}
                                icon={false}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Textarea
                                theme={textAreaTheme}
                                icon={HiOutlineDocumentText}
                                id="chronology"
                                value={newData.chronology}
                                onChange={handleInputChange}
                                rows={3}
                                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 "
                                placeholder='Chronology of Damage'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                id="damage"
                                value={newData.damage}
                                onChange={handleInputChange}
                                sizing={"md"}
                                icon={RiFileDamageLine}
                                placeholder="Damage to the Property"
                                required />
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
                            <TextInput value={newData?.upload?.name} className="w-full cursor-pointer" icon={BsFileEarmarkCheck} rightIcon={IoMdAddCircleOutline} placeholder="Upload Proof of Transaction" />
                            <input
                                type="file"
                                accept=".pdf, .jpeg, .jpg, .png, image/*"
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
                            <div className="flex gap-x-4 justify-center items-center">
                                <h1 onClick={() => setEditModal(false)} className="font-semibold cursor-pointer" >
                                    Cancel
                                </h1>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="bg-purple hover:bg-purple-dark transition-colors duration-200 w-32 h-12 rounded-lg text-white font-semibold focus:outline-none enabled:outline-none"
                                >
                                    {isPending ? <Spinner color="white" size={'sm'} /> : 'Send Request'}
                                </button>
                            </div>
                        </div>
                    </Flowbite>
                </form>
            </div>
        </div>
    )
}
export default RepairInquiryEditUser;