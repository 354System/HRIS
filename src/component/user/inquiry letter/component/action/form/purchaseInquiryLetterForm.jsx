import { React, useRef, useState } from "react";
import { Icon } from '@iconify/react';
import { IoMdAddCircleOutline, IoMdClose } from "react-icons/io";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TextInput, Button, Datepicker, Textarea } from "flowbite-react";
import { TbDeviceIpadHorizontal } from "react-icons/tb";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCalendar2DateFill, BsFileEarmarkCheck } from "react-icons/bs";
import { Flowbite } from "flowbite-react";
import { format } from "date-fns";
import { usePurchaseInquiryLetter } from "../../../../../../api/inquiry letter/usePurchaseInquiryLetter";
import { createDatePickerTheme, flowbiteTheme } from "../../../../../../lib/flowbiteTheme";
import { Spinner } from "@chakra-ui/react";
import { BiPurchaseTagAlt, BiSolidPurchaseTagAlt } from "react-icons/bi";
import { confirmAlert, successAlert } from "../../../../../../lib/sweetAlert";
const PurchaseInquiryLetterForm = ({ setPurchaseFormPopUp, refetchInquiryData }) => {
    const [errorMsg, setErrorMsg] = useState({
        input: '',
        file: ''
    })

    const [data, setData] = useState({
        title: '',
        date: format(new Date(), "MMMM dd, yyyy"),
        name: '',
        reason: '',
        cost: '',
        upload: null
    })
    const [color, setColor] = useState({
        title: 'gray',
        name: 'gray',
        reason: 'gray',
        cost: 'gray',
        upload: 'gray'
    })

    const fileinput = useRef(null)

    const handleInputChange = (e) => {
        setData((prevState) => ({
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
                // Simpan file ke state data jika diperlukan
                setData((prevData) => ({
                    ...prevData,
                    upload: selectedFile
                }));
            } else {
                setErrorMsg((prevState) => ({
                    ...prevState,
                    file: "File must be .jpg, .png, or .pdf !"
                }))
                e.target.value = "";
            }
        }
    };

    const { mutate, isPending } = usePurchaseInquiryLetter({
        onSuccess: (data) => {
            console.log(data);
            refetchInquiryData();
            setPurchaseFormPopUp(false)
            successAlert({ title: 'Your Purchase Request has been Submitted !' })
        },
        onError: (error) => {
            console.log(error);
            setErrorMsg((prevState) => ({
                ...prevState,
                input: 'Something went wrong !'
            }))
        }
    })
    const findFirstEmptyField = () => {
        const fields = ['title', 'date', 'name', 'reason', 'cost', 'upload'];
        for (const field of fields) {
            if (!data[field]) {
                return field;
            }
        }
        return null;
    };

    const validateInput = () => {
        const { title, name, reason, cost, upload } = data;
        const missingFields = [];
        if (!title) {
            missingFields.push('Title');
        }
        if (!name) {
            missingFields.push('Name');
        }
        if (!reason) {
            missingFields.push('Reason');
        }
        if (!cost) {
            missingFields.push('Cost');
        }
        if (!upload) {
            missingFields.push('File');
        }
        if (missingFields.length > 0) {
            const errorMessage = `${missingFields.join(', ')} ${missingFields.length > 1 ? 'are' : 'is'} Required !`;
            setErrorMsg({
                input: errorMessage
            });
            setColor({
                title: missingFields.includes('Title') ? 'failure' : 'gray',
                date: missingFields.includes('Date') ? 'failure' : 'gray',
                name: missingFields.includes('Name') ? 'failure' : 'gray',
                reason: missingFields.includes('Reason') ? 'failure' : 'gray',
                cost: missingFields.includes('Cost') ? 'failure' : 'gray',
                upload: missingFields.includes('File') ? 'failure' : 'gray',
            });
            return false;
        } else {
            setErrorMsg((prevState) => ({
                ...prevState,
                input: ''
            }))
            setColor((prevState) => ({
                ...prevState,
                title: 'gray',
                name: 'gray',
                reason: 'gray',
                cost: 'gray',
                upload: 'gray'
            }))
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateInput()

        const { title, name, reason, cost, upload } = data
        const formData = new FormData();
        formData.append('category', 'Purchase');
        formData.append('title', title);
        formData.append('name', name);
        formData.append('reason', reason);
        formData.append('cost', cost);
        formData.append('image', upload);
        if (validateInput()) {
            confirmAlert({
                title: "Are you sure you want to Submit this Purchase Request?",
                confirmText: 'Yes, Submit !',
            }).then((result) => {
                if (result.isConfirmed) {
                    mutate(formData)
                }
            })
        } else {
            const emptyField = findFirstEmptyField();
            const inputElement = document.getElementById(emptyField);
            inputElement.focus();
            inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setColor((prevState) => ({
                ...prevState,
                title: !title ? 'failure' : 'gray',
                name: !name ? 'failure' : 'gray',
                reason: !reason ? 'failure' : 'gray',
                cost: !cost ? 'failure' : 'gray',
                upload: !upload ? 'failure' : 'gray',
            }));
        }
    }

    return (
        <div className="fixed w-full min-h-screen inset-0 flex items-center justify-center z-20 bg-black/60">
            <div className="fixed overflow-y-auto top-1/2 transform -translate-y-1/2 bg-white p-5 laptop:w-1/2 laptop:h-4/5 hp:w-11/12 hp:h-1/2 rounded-lg flex flex-col">
                <div className="absolute top-2 right-2 ">
                    <button
                        onClick={() => setPurchaseFormPopUp(false)}
                        className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
                        <IoMdClose size={20} color="white" />
                    </button>
                </div>
                <div className=" flex items-center mb-4">
                    <div className="bg-purple rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <BiPurchaseTagAlt size={25} color="white" />
                    </div>
                    <div className="flex flex-col px-2">
                        <span className="font-semibold">Form Purchase Inquiry</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} noValidate className="p-2">
                    <Flowbite theme={{ theme: flowbiteTheme }} className="cursor-none">
                        <div className="mb-4">
                            <TextInput
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={handleInputChange}
                                color={color.title}
                                icon={HiOutlineDocumentText}
                                placeholder="Title"
                                sizing={"md"}
                                maxLength={30}

                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Datepicker
                                id="date"
                                value={data.date}
                                icon={false}
                                rightIcon={BsCalendar2DateFill}
                                showClearButton={false}
                                placeholder="Select date"
                                disabled
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={handleInputChange}
                                color={color.name}
                                sizing={"md"}
                                icon={TbDeviceIpadHorizontal}
                                placeholder="Item Name"
                                required />
                        </div>
                        <div className="mb-4">
                            <Textarea
                                type="text"
                                id="reason"
                                value={data.reason}
                                onChange={handleInputChange}
                                color={color.reason}
                                rows={3}
                                className="block p-2.5 w-full"
                                placeholder='Reason for Purchase'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                type="number"
                                id="cost"
                                value={data.cost}
                                onChange={handleInputChange}
                                color={color.cost}
                                sizing={"md"}
                                icon={AiOutlineDollarCircle}
                                onWheel={(e) => e.target.blur()}
                                onKeyDown={(e) => {
                                    if (e.key === '.' || e.key === ',') {
                                        e.preventDefault();
                                    }
                                }}
                                className="w-full h-10"
                                placeholder="Estimated Costs"
                                required />
                        </div>
                        <div className="mb-8 h-12" onClick={() => fileinput.current.click()}>
                            <TextInput
                                value={data?.upload?.name}
                                color={color.upload}
                                icon={BsFileEarmarkCheck}
                                rightIcon={IoMdAddCircleOutline}
                                className="w-full cursor-pointer"
                                placeholder="Upload Attachments"
                                readOnly
                                required
                            />
                            <input
                                type="file"
                                accept=".pdf "
                                id="upload"
                                className="hidden"
                                ref={fileinput}
                                onChange={handleFileChange}
                            />
                            <p className="text-red-500 text-sm">{errorMsg.file}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                {errorMsg.input && <p className="text-red-500 font-semibold">{errorMsg.input}</p>}
                            </div>
                            <div className="flex gap-x-4 items-center">
                                <h1 onClick={() => setPurchaseFormPopUp(false)} className="font-semibold text-base cursor-pointer hover:underline" >
                                    Cancel
                                </h1>
                                <Button
                                    color="purple"
                                    isProcessing={isPending}
                                    processingSpinner={<Spinner size={"sm"} />}
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="w-32 h-11"
                                >
                                    Send Request
                                </Button>
                            </div>
                        </div>
                    </Flowbite>
                </form>
            </div>
        </div>
    )
}

export default PurchaseInquiryLetterForm;