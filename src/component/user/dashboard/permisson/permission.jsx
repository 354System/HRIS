import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Spinner } from "@chakra-ui/react";
import { BsCalendar2DateFill } from "react-icons/bs";
import { Button, Datepicker, Flowbite, Select, TextInput, Textarea } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";
import { GrDocumentPdf } from "react-icons/gr";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { TbCalendarUser } from "react-icons/tb";
import { confirmAlert, successAlert } from "../../../../lib/sweetAlert";
import { format } from "date-fns";
import { usePermission } from "../../../../api/permission/usePermission";

const Permision = ({ popUp }) => {
  const [permission, setPermission] = useState({
    izin: "",
    fromdate: "",
    untildate: "",
    description: "",
    otherReason: '',
    file: null,
  });

  const [color, setColor] = useState({
    izin: 'gray',
    fromdate: 'gray',
    untildate: 'gray',
    description: 'gray',
    otherReason: 'gray',
    file: 'gray'
  })

  const [errorMsg, setErrorMsg] = useState({
    input: '',
    file: ''
  })


  const handleInputChange = (e) => {
    setPermission((prevState) => ({
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
        setPermission((prevState) => ({
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

  const otherReasonRef = useRef(null)

  useEffect(() => {
    if (permission.izin === 'Enter Other Reason') {
      otherReasonRef.current.focus();
    }
  }, [permission.izin, otherReasonRef]);

  const findFirstEmptyField = () => {
    const fields = ['izin', 'fromdate', 'untildate', 'description', 'file', 'otherReason'];
    for (const field of fields) {
      if (field === 'otherReason' && permission.izin === 'Enter Other Reason' && !permission[field]) {
        return field;
      }
      if (!permission[field]) {
        return field;
      }
    }
    return null;
  };

  const validateInput = () => {
    const { izin, fromdate, untildate, description, file } = permission;
    const missingFields = [];
    if (!izin) {
      missingFields.push('izin');
    }
    if (!fromdate) {
      missingFields.push('fromdate');
    }
    if (!untildate) {
      missingFields.push('untildate');
    }
    if (!description) {
      missingFields.push('description');
    }
    if (!file) {
      missingFields.push('file');
    }
    if (missingFields.length > 0) {
      const errorMessage = `${missingFields.join(', ')} ${missingFields.length > 1 ? 'are' : 'is'} Required !`;
      setErrorMsg({
        input: errorMessage
      });
      setColor({
        izin: missingFields.includes('izin') ? 'failure' : 'gray',
        fromdate: missingFields.includes('fromdate') ? 'failure' : 'gray',
        untildate: missingFields.includes('untildate') ? 'failure' : 'gray',
        description: missingFields.includes('description') ? 'failure' : 'gray',
        file: missingFields.includes('file') ? 'failure' : 'gray',
      });
      return false;
    } else {
      setErrorMsg((prevState) => ({
        ...prevState,
        input: ''
      }))
      setColor((prevState) => ({
        ...prevState,
        izin: 'gray',
        fromdate: 'gray',
        untildate: 'gray',
        description: 'gray',
        file: 'gray'
      }))
      return true
    }
  }

  const { mutate, isPending } = usePermission({
    onSuccess: (data) => {
      successAlert({
        title: 'Your Permission has been Submitted !',
        text: 'Please wait for your approval',
      })
      console.log(data);
      popUp(false);
      setSuccesMsg(data.message);
    },
    onError: (error) => {
      console.log(error);
      setErrorMsg('Something Went Wrong !');
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    validateInput()
    const { izin, fromdate, untildate, description, otherReason, file } = permission
    const formData = new FormData();
    formData.append('izin', izin === 'Enter Other Reason' ? otherReason : izin);
    formData.append('fromdate', fromdate);
    formData.append('untildate', untildate);
    formData.append('description', description);
    formData.append('image', file);

    if (validateInput()) {
      setErrorMsg((prevState) => ({
        ...prevState,
        input: '',
        file: ''
      }))
      confirmAlert({
        title: "Are you sure want to Submit this Permission",
        confirmText: "Yes, Submit !"
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
        izin: !izin ? 'failure' : 'gray',
        fromdate: !fromdate ? 'failure' : 'gray',
        untildate: !untildate ? 'failure' : 'gray',
        description: !description ? 'failure' : 'gray',
        file: !file ? 'failure' : 'gray',
        otherReason: !otherReason ? 'failure' : 'gray',
      }));
    }
  }

  useEffect(() => {
    const { izin, fromdate, untildate, description, file, otherReason } = permission;
    if (izin === 'Enter Other Reason' && otherReason) {
      setColor((prevState) => ({
        ...prevState,
        otherReason: 'gray'
      }));
    }
    if (izin) {
      setColor((prevState) => ({
        ...prevState,
        izin: 'gray'
      }));
    }
    if (fromdate) {
      setColor((prevState) => ({
        ...prevState,
        fromdate: 'gray'
      }));
    }
    if (untildate) {
      setColor((prevState) => ({
        ...prevState,
        untildate: 'gray'
      }));
    }
    if (description) {
      setColor((prevState) => ({
        ...prevState,
        description: 'gray'
      }));
    }
    if (file) {
      setColor((prevState) => ({
        ...prevState,
        file: 'gray'
      }));
    }
    if (izin) {
      setColor((prevState) => ({
        ...prevState,
        izin: 'gray'
      }));
    }
  }, [permission])

  return (
    <div className="fixed w-full min-h-screen inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="fixed top-1/2 transform -translate-y-1/2 gap-4 bg-white p-4 laptop:w-1/2 hp:w-11/12 laptop:h-4/5 hp:h-11/12 rounded-lg flex flex-col overflow-y-auto">
        <div className="absolute right-2 top-2">
          <button
            onClick={() => popUp(false)}
            className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-purple rounded-full w-[50px] h-[50px] flex items-center justify-center">
            <TbCalendarUser size={25} color="white" />
          </div>
          <div>
            <span className=" font-semibold">Permission</span>
          </div>
        </div>
        <Flowbite theme={{ theme: flowbiteTheme }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex-col flex">
              <Select
                color={color.izin}
                id="izin"
                value={permission.izin}
                onChange={handleInputChange}
                className="w-full"
              >
                <option value={''} className="font-semibold">
                  Select Reason
                </option>
                <option value="Sick">
                  Sick
                </option>
                <option value="Holiday">
                  Holiday
                </option>
                <option value="Family event">
                  Family Events
                </option>
                <option value="Enter Other Reason">Enter Other Reason</option> {/* Tambahkan opsi "Other" */}
              </Select>
              {permission.izin === 'Enter Other Reason' && (
                <TextInput
                  color={color.otherReason}
                  ref={otherReasonRef}
                  id="otherReason"
                  value={permission.otherReason}
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter Other Reason"
                  className="w-full mt-4"
                />
              )}
            </div>
            <div className="">
              <Datepicker
                color={color.fromdate}
                className="w-full"
                placeholder="Select From Date"
                minDate={new Date()}
                id="fromdate"
                value={permission.fromdate}
                showClearButton={false}
                onSelectedDateChanged={date => setPermission(prevNewData => ({ ...prevNewData, fromdate: format(date, 'MMMM dd, yyyy') }))}
                rightIcon={BsCalendar2DateFill}
                icon={false}
                required
              />
            </div>
            <div className="">
              <Datepicker
                color={color.untildate}
                className="w-full"
                placeholder="Select Until Date"
                id="untildate"
                value={permission.untildate}
                disabled={!permission.fromdate}
                showClearButton={false}
                minDate={new Date(permission.fromdate)}
                onSelectedDateChanged={date => setPermission(prevNewData => ({ ...prevNewData, untildate: format(date, 'MMMM dd, yyyy') }))}
                rightIcon={BsCalendar2DateFill}
                icon={false}
                required
              />
            </div>
            <div className="" onClick={() => fileinput.current.click()}>
              <TextInput
                color={color.file}
                className="w-full h-10 cursor-pointer"
                id="file"
                value={permission?.file?.name}
                icon={GrDocumentPdf}
                rightIcon={IoIosAdd}
                readOnly
                placeholder="Upload File Document"
              />
              <input
                type="file"
                hidden
                accept=".pdf, image/*, .jpeg, .jpg, .png,"
                ref={fileinput}
                onChange={handleFileChange}
              />
              {errorMsg.file && <p className="text-sm text-red-500">{errorMsg.file}</p>}
            </div>
            <div className="">
              <Textarea
                color={color.description}
                icon={HiOutlineDocumentText}
                id="description"
                value={permission.description}
                onChange={handleInputChange}
                rows={4}
                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 "
                placeholder='Description'
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="w-1/3">
                {errorMsg.input && <p className="text-red-500 font-semibold">{errorMsg.input}</p>}
              </div>
              <div className="w-2/3 flex gap-x-4 justify-center items-center">
                <h1 onClick={() => popUp(false)} className="font-semibold cursor-pointer hover:underline" >
                  Cancel
                </h1>
                <Button
                  onClick={handleSubmit}
                  color="purple"
                  isProcessing={isPending}
                  processingSpinner={<Spinner size={'sm'} />}
                  type="submit"
                  disabled={isPending}
                  className=" h-11 font-semibold"
                >
                  Send Permission
                </Button>
              </div>
            </div>
          </form>
        </Flowbite>
      </div>
    </div>
  );
}

export default Permision;