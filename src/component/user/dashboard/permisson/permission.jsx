import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { usePermission } from "../../../../api/attendance/usePermission";
import { Spinner } from "@chakra-ui/react";

const Permision = ({ popUp }) => {
  const [permission, setPermission] = useState({
    izin: "Sick",
    fromdate: "",
    untildate: "",
    description: "",
  });

  const [succesMsg, setSuccesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const fileinput = useRef(null)

  const handleInputChange = (e) => {
    if (e.target.id === "fromdate" || e.target.id === "untildate") {
      // Konversi tanggal ke format yang sesuai
      setPermission((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    } else {
      setPermission((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedExtensions = ["jpg", "png", "pdf"];
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        setSelectedFileName(selectedFile.name);
      } else {
        alert("Hanya file dengan ekstensi .jpg, .png, dan .pdf yang diizinkan.");
        e.target.value = "";
      }
    }
  }

  const { mutate, isPending } = usePermission({
    onSuccess: (data) => {
      console.log(data);
      popUp(false);
      setSuccesMsg(data.message);
    },
    onError: (error) => {
      console.log(error);
      const errorMessage = error.response.data.message;
      setErrorMsg(errorMessage);
    }
  })

  const handleSubmit = () => {
    const { izin, fromdate, untildate, description } = permission
    mutate({
      izin,
      fromdate,
      untildate,
      description
    })
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-full">
      <div className="absolute gap-4 top-1/2 transform -translate-y-1/2 bg-white p-4 w-[550px] h-[550px] rounded-lg flex flex-col">
        <div className="absolute right-0 top-0 -mr-2 -mt-2">
          <button
            onClick={() => popUp(false)}
            className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
            <Icon icon="solar:widget-add-outline" />
          </div>
          <div className="">
            <span className=" font-semibold">Permission</span>
          </div>
        </div>
        <div className="flex-col flex ">
          {succesMsg && <p className="text-green">{succesMsg}</p>}
          {errorMsg && <p className="text-red">{errorMsg}</p>}
          <select
            id="izin"
            value={permission.izin}
            onChange={handleInputChange}
            className="bg-[#ACACAC]/50 p-3 cursor-pointer border border-gray-300 text-black text-sm rounded-lg font-semibold h-12"
          >
            <option value="Sick" className="font-semibold">
              Sick
            </option>
            <option value="Holiday" className="font-semibold">
              Holiday
            </option>
            <option value="Family event" className="font-semibold">
              Family Events
            </option>
            <option value="Other">Enter Other Reason</option> {/* Tambahkan opsi "Other" */}
          </select>
          {permission.izin === 'Enter Other Reason' && ( // Tampilkan input teks hanya jika "Other" dipilih
            <input
              id="otherReason"
              type="text"
              value={permission.izin}
              onChange={handleInputChange}
              placeholder="Enter Other Reason"
              className=" p-3 mt-4 cursor-pointer bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg font-semibold h-10"
            />
          )}
        </div>
        <div className=" flex justify-end">
          <div>
            <label
              htmlFor="fromdate"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            ></label>
          </div>
          <input
            type="date"
            id="fromdate"
            value={permission.fromdate}
            onChange={handleInputChange}
            className="bg-[#ACACAC]/50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Date"
          />
        </div>
        <div className=" flex justify-end">
          <div>
            <label
              htmlFor="untildate"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            ></label>
          </div>
          <input
            type="date"
            id="untildate"
            value={permission.untildate}
            onChange={handleInputChange}
            className="bg-[#ACACAC]/50 p-3 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="End Date"
          />
        </div>
        <div className=" flex gap-3 w-full relative items-center">
          <div className="bg-[#ACACAC]/50 w-[70px] h-[50px] rounded-lg flex items-center justify-center">
            <Icon icon="eva:folder-add-fill" width="21.95" onClick={() => fileinput.current.click()} className="cursor-pointer" />
          </div>
          <Icon icon="ri:add-circle-fill" width="21.44" className="absolute left-0 top-0 mt-8 ml-12 cursor-pointer" onClick={() => fileinput.current.click()} />
          <input
            type="file"
            id="file_input"
            className="hidden"
            ref={fileinput}
            onChange={handleFileChange}
          />
          <div className="bg-[#ACACAC]/50 w-full h-[50px] flex items-center p-3 rounded-lg">
            {selectedFileName && <p className="text-sm">{selectedFileName}</p>}
          </div>
        </div>
        <div className="flex h-[135px]">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          </label>
          <input
            type="text"
            id="description"
            value={permission.description}
            onChange={handleInputChange}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-[#ACACAC]/50 sm:text-md" placeholder="Description"
          ></input>
        </div>
        <div className="text-end flex justify-end gap-x-8 ">
          <span onClick={() => popUp(false)} className="flex items-center font-semibold cursor-pointer text-gray-700 hover:underline underline-offset-2 hover:text-gray-800 transition duration-300">
            Cancel
          </span>
          <button onClick={handleSubmit} className="w-24 bg-purple hover:bg-[#5c215c] transition-colors duration-300 text-white font-semibold p-3 rounded-lg">
              {isPending ? <Spinner size={20} /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Permision;