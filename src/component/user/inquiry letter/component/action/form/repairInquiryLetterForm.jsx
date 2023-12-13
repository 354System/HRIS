import { useRef, useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCalendar2DateFill, BsFileEarmarkCheck } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { RiFileDamageLine } from "react-icons/ri";
import { Button, Datepicker, Flowbite, TextInput, Textarea } from "flowbite-react";
import { format } from "date-fns";
import { Spinner } from "@chakra-ui/react";
import { flowbiteTheme } from "../../../../../../lib/flowbiteTheme";
import { useRepairInquiryLetter } from "../../../../../../api/inquiry letter/useRepairInquiryLetter";
import { IoMdAddCircleOutline, IoMdClose } from "react-icons/io";
import { confirmAlert, successAlert } from "../../../../../../lib/sweetAlert";

const RepairInquryLetterForm = ({ setRepairFormPopUp, refetchInquiryData }) => {
    const [errorMsg, setErrorMsg] = useState({
        input: '',
        file: ''
    })

    const [data, setData] = useState({
        title: '',
        date: format(new Date(), "MMMM dd, yyyy"), // new Date(),
        chronology: '',
        damage: '',
        cost: '',
        upload: null
    })

    const [color, setColor] = useState({
        title: 'gray',
        chronology: 'gray',
        damage: 'gray',
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

    const { mutate, isPending } = useRepairInquiryLetter({
        onSuccess: (data) => {
            console.log(data);
            successAlert({ title: 'Your Repair Request has been Submitted !' })
            refetchInquiryData();
            setRepairFormPopUp(false)
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
        const fields = ['title', 'chronology', 'damage', 'cost', 'upload'];
        for (const field of fields) {
            if (!data[field]) {
                return field;
            }
        }
        return null;
    };

    const validateInput = () => {
        const { title, chronology, damage, cost, upload } = data;
        const missingFields = [];
        if (!title) {
            missingFields.push('Title');
        }
        if (!chronology) {
            missingFields.push('Chronology');
        }
        if (!damage) {
            missingFields.push('Damage');
        }
        if (!cost) {
            missingFields.push('Cost');
        }
        if (!upload) {
            missingFields.push('Upload');
        }
        if (missingFields.length > 0) {
            const errorMessage = `${missingFields.join(', ')} ${missingFields.length > 1 ? 'are' : 'is'} Required !`;
            setErrorMsg({
                input: errorMessage
            });
            setColor({
                title: missingFields.includes('Title') ? 'failure' : 'gray',
                chronology: missingFields.includes('chronology') ? 'failure' : 'gray',
                damage: missingFields.includes('damage') ? 'failure' : 'gray',
                cost: missingFields.includes('Cost') ? 'failure' : 'gray',
                upload: missingFields.includes('Upload') ? 'failure' : 'gray',
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
                chronology: 'gray',
                damage: 'gray',
                cost: 'gray',
                upload: 'gray'
            }))
            return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        validateInput()
        
        const { title, chronology, damage, cost, upload } = data

        const formData = new FormData();
        formData.append('category', 'Repair');
        formData.append('title', title);
        formData.append('chronology', chronology);
        formData.append('damage', damage);
        formData.append('cost', cost);
        formData.append('image', upload);

        if (validateInput()) {
            setErrorMsg((prevState) => ({
                ...prevState,
                input: '',
                file: ''
            }))
            confirmAlert({
                title: 'Are you sure you want to Submit this Repair Request ?',
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
                chronology: !chronology ? 'failure' : 'gray',
                damage: !damage ? 'failure' : 'gray',
                cost: !cost ? 'failure' : 'gray',
                upload: !upload ? 'failure' : 'gray',
            }));
        }
    }

    return (
        <div className="fixed w-full min-h-screen inset-0 flex items-center justify-center z-20 bg-black/60">
            <div className="fixed overflow-y-auto top-1/2 transform -translate-y-1/2 bg-white p-5 laptop:w-1/2 laptop:h-4/5 hp:w-11/12 hp:h-11/12 rounded-lg flex flex-col">
                <div className="absolute top-2 right-2 ">
                    <button
                        onClick={() => setRepairFormPopUp(false)}
                        className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
                        <IoMdClose size={20} color="white" />
                    </button>
                </div>
                <div className=" flex items-center mb-4">
                    <div className="bg-purple rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <HiOutlineWrenchScrewdriver size={23} color="white" />
                    </div>
                    <div className="flex flex-col px-2">
                        <span className="font-semibold">Form Repair Inquiry</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-2">
                    <Flowbite theme={{ theme: flowbiteTheme }} className="cursor-none">
                        <div className="mb-4">
                            <TextInput
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={handleInputChange}
                                color={color.title}
                                sizing={"md"}
                                icon={HiOutlineDocumentText}
                                placeholder="Title"
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
                            <Textarea
                                type="text"
                                id="chronology"
                                value={data.chronology}
                                onChange={handleInputChange}
                                color={color.chronology}
                                rows={3}
                                className="block p-2.5 w-full"
                                placeholder='Chronology of Damage'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                type="text"
                                id="damage"
                                value={data.damage}
                                onChange={handleInputChange}
                                color={color.damage}
                                sizing={"md"}
                                icon={RiFileDamageLine}
                                placeholder="Damage to the Property"
                                required />
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
                        <div className="mb-8" onClick={() => fileinput.current.click()}>
                            <TextInput
                                value={data?.upload?.name}
                                color={color.upload}
                                icon={BsFileEarmarkCheck}
                                rightIcon={IoMdAddCircleOutline}
                                className="w-full cursor-pointer"
                                placeholder="Upload Proof of Transaction"
                                readOnly
                                required
                            />
                            <input
                                type="file"
                                id="file_input"
                                onChange={handleFileChange}
                                accept=".pdf, image/*, .jpeg, .jpg, .png,"
                                className="hidden"
                                ref={fileinput}
                            />
                            <p className="text-red-500 text-sm">{errorMsg.file}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                {errorMsg.input && <p className="text-red-500 font-semibold">{errorMsg.input}</p>}
                            </div>
                            <div className="flex gap-x-4 justify-center items-center">
                                <h1 onClick={() => setRepairFormPopUp(false)} className="font-semibold cursor-pointer hover:underline" >
                                    Cancel
                                </h1>
                                <Button
                                    onClick={handleSubmit}
                                    color="purple"
                                    isProcessing={isPending}
                                    processingSpinner={<Spinner size={'sm'} />}
                                    type="submit"
                                    disabled={isPending}
                                    className="w-32 h-11 font-semibold"
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
export default RepairInquryLetterForm;