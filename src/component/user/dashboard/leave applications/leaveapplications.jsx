import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useLeaveApplication } from "../../../../api/attendance/useLeaveApplication";
import { Spinner } from "@chakra-ui/react";
import { confirmAlert, successAlert } from "../../../../lib/sweetAlert";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";
import { GrDocumentPdf } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FcLeave } from "react-icons/fc";
import { Button, Datepicker, Flowbite, Select, TextInput, Textarea } from "flowbite-react";
import { format } from "date-fns";

const LeaveApplications = ({ leave }) => {
  const [data, setData] = useState({
    cuti: "",
    fromdate: '',
    untildate: '',
    description: "",
    file: '',
    otherReason: ""
  })
  const [color, setColor] = useState({
    cuti: 'gray',
    fromdate: 'gray',
    untildate: 'gray',
    description: 'gray',
    otherReason: 'gray',
  })
  const [errorMsg, setErrorMsg] = useState({
    input: '',
    file: ''
  })

  const fileinput = useRef(null)

  const handleInputChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

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
        setData((prevState) => ({
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
    if (data.cuti === 'Enter Other Reason') {
      otherReasonRef.current.focus();
    }
  }, [data.cuti, otherReasonRef]);

  const findFirstEmptyField = () => {
    const fields = ['cuti', 'fromdate', 'untildate', 'description', 'file', 'otherReason'];
    for (const field of fields) {
      if (field === 'otherReason' && data.cuti === 'Enter Other Reason' && !data[field]) {
        return field;
      }
      if (!data[field]) {
        return field;
      }
    }
    return null;
  };

  const validateInput = () => {
    const { cuti, fromdate, untildate, description, file, otherReason } = data;
    const missingFields = [];
    if (!cuti) {
      missingFields.push('reason');
    }
    if (cuti === 'Enter Other Reason' && !otherReason) {
      missingFields.push('reason');
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
        cuti: missingFields.includes('cuti') ? 'failure' : 'gray',
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
        cuti: 'gray',
        fromdate: 'gray',
        untildate: 'gray',
        description: 'gray',
        file: 'gray'
      }))
      return true
    }
  }

  const { mutate, isPending } = useLeaveApplication({
    onSuccess: (data) => {
      successAlert({
        title: 'Your Paid Leave has been Submitted !',
        text: 'Please wait for your approval',
      })
      console.log(data);
      leave(false);
    },
    onError: (error) => {
      console.log(error);
      setErrorMsg((prevState) => ({
        ...prevState,
        input: 'Something went wrong !'
      }));
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    validateInput()
    const { cuti, fromdate, untildate, description, otherReason, file } = data
    const formData = new FormData();
    formData.append('cuti', cuti === 'Enter Other Reason' ? otherReason : cuti);
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
        title: "Are you sure want to Submit this data",
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
        cuti: !cuti ? 'failure' : 'gray',
        fromdate: !fromdate ? 'failure' : 'gray',
        untildate: !untildate ? 'failure' : 'gray',
        description: !description ? 'failure' : 'gray',
        file: !file ? 'failure' : 'gray',
        otherReason: !otherReason ? 'failure' : 'gray',
      }));
    }
  }

  return (
    <div className="fixed w-full min-h-screen inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="fixed top-1/2 transform -translate-y-1/2 gap-4 bg-white p-4 laptop:w-1/2 hp:w-11/12 laptop:h-4/5 hp:h-2/4 rounded-lg flex flex-col overflow-y-auto">
        <div className="absolute right-2 top-2">
          <button
            onClick={() => leave(false)}
            className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-purple rounded-full w-[50px] h-[50px] flex items-center justify-center">
            <FcLeave size={25} />
          </div>
          <div>
            <p className=" font-semibold">Leave Applications</p>
          </div>
        </div>
        <Flowbite theme={{ theme: flowbiteTheme }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex-col flex">
              <Select
                color={color.cuti}
                id="cuti"
                value={data.cuti}
                onChange={handleInputChange}
                className="w-full"
              >
                <option value='' className="font-semibold">
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
              {data.cuti === 'Enter Other Reason' && (
                <TextInput
                  color={color.otherReason}
                  ref={otherReasonRef}
                  id="otherReason"
                  value={data.otherReason}
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
                id="fromdate"
                value={data.fromdate}
                showClearButton={false}
                onSelectedDateChanged={date => setData(prevNewData => ({ ...prevNewData, fromdate: format(date, 'MMMM dd, yyyy') }))}
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
                value={data.untildate}
                disabled={!data.fromdate}
                showClearButton={false}
                minDate={new Date(data.fromdate)}
                onSelectedDateChanged={date => setData(prevNewData => ({ ...prevNewData, untildate: format(date, 'MMMM dd, yyyy') }))}
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
                value={data?.file?.name}
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
                id="description"
                value={data.description}
                onChange={handleInputChange}
                rows={4}
                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 "
                placeholder='Description'
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                {errorMsg.input && <p className="text-red-500 font-semibold">{errorMsg.input}</p>}
              </div>
              <div className="flex gap-x-4 justify-center items-center">
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
                  Send Paid Leave
                </Button>
              </div>
            </div>
          </form>
        </Flowbite>
      </div>
    </div >
  );
};

export default LeaveApplications;
