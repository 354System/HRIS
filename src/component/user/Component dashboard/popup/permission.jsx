import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";

const Permision = (props) => {
  const { popUp } = props;
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);


  const [permission, setPermission] = useState({
    izin: "",
    fromdate: "",
    untildate: "",
    deskripsi: "",
  });


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

  // Simpan token ke dalam localStorage
  const token = localStorage.getItem("token");
  // if (token) {
  //   console.log("Token yang diambil dari localStorage:", token);
  // } else {
  //   console.log("Token tidak ditemukan di localStorage.");
  //   // Lakukan tindakan yang sesuai jika token tidak ada.
  // }

  const headers = {
    "Content-Type": "application/json",
    // Tambahkan token ke header permintaan
    "Authorization": `Bearer ${token}`,
  };


  const handlepremission = () => {
    // Kirim data pengguna ke backend
    fetch("https://fzsxpv5p-3000.asse.devtunnels.ms/izin/create", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        izin: permission.izin,
        fromdate: permission.fromdate,
        untildate: permission.untildate,
        description: permission.deskripsi,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Handle respons dari backend
        // Redirect atau lakukan tindakan lain setelah menerima token
        // window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/absensi/file', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded successfully:', data);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    } else {
      console.error('No file selected');
    }
  };

  const handleClose = () => {
    popUp(false);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-full">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[667px] h-[700px] rounded-lg flex flex-col">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center"
          >
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="flex">
          <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
            <Icon icon="solar:widget-add-outline" />
          </div>
          <div className="flex flex-col px-2 mt-2">
            <span className=" font-semibold">Permission</span>
          </div>
        </div>
        <div className="flex-col flex mt-9 ">
          <select
            id="izin"
            value={permission.izin}
            onChange={handleInputChange}
            className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg font-semibold h-10"
          >
            <option value>select Permission</option>
            <option value="Sick" className="font-semibold">
              Sick
            </option>
            <option value="Holiday" className="font-semibold">
              Holiday
            </option>
            <option value="Family event" className="font-semibold">
              Family Events
            </option>
          </select>
        </div>
        <div className="mt-4  justify-end">
          <div>
            <label
              htmlFor="fromdate"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            >silahkan input fromdate</label>
          </div>
          <input
            type="date"
            id="fromdate"
            value={permission.fromdate}
            onChange={handleInputChange}
            className="mt-6 bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Date"
          />
          {/* <Icon
            icon="solar:calendar-date-bold"
            width="21.14"
            className="absolute mt-2 mr-2"
            onClick={() => document.getElementById("default-input").click()}
          />  */}
        </div>
        <div className="mt-4  justify-end">
          <div>
            <label
              htmlFor="untildate"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            >Silahkan input untildate</label>
          </div>
          <input
            type="date"
            id="untildate"
            value={permission.untildate}
            onChange={handleInputChange}
            className=" mt-6 bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="End Date"
          />
          {/* <Icon
            icon="solar:calendar-date-bold"
            width="21.14"
            className="absolute mt-2 mr-2"
          /> */}
        </div>
        <div className=" mt-2 gap-x-6 ">
          <div className="mt-4 flex  gap-3 w-full relative items-center">
            <div className="bg-[#ACACAC]/50 w-[70px] h-[50px] rounded-lg flex items-center justify-center">
              <Icon icon="eva:folder-add-fill" width="21.95" onClick={() => fileinput.current.click()} className="cursor-pointer" />
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
        <div className=" mt-8 h-[135px]">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Masukkan Keterangan Cuti Anda</label>
          <input
            type="text"
            id="deskripsi"
            value={permission.deskripsi}
            onChange={handleInputChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-[#ACACAC]/50 sm:text-md" placeholder="Description"
          ></input>
        </div>
        <div className="text-end flex justify-end gap-x-8 mt-20">
          <h1 onClick={handleClose} className="mt-[11px] font-semibold cursor-pointer">Cancel</h1>
          <button onClick={() => { handlepremission(); handleUpload(); }}
            className="bg-[#A332C3] w-[155px] h-[46px] rounded-lg text-white font-semibold hover:bg-fuchsia-700">
            Send Permission
          </button>
        </div>
      </div>
    </div>
  );
};

export default Permision;