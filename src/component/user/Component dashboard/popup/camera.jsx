import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Webcam from "react-webcam";
import Result from "./result";

const Camera = ({ WFO, checkInPopUp, status }) => {

  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("token");
  const [devices, setDevices] = useState([]);
  const [waktu, setWaktu] = useState("");
  const [tanggal, setTanggal] = useState("");
  const webcamRef = useRef(null);
  const [datas, setDatas] = useState({
    filePhoto: null,
    times: "",
    date: "",
    status: "",
  });
  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64ToBlob = (base64) => {
      const byteCharacters = atob(base64.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: "image/png" });
    };

    const blob = base64ToBlob(imageSrc);
    const file = new File([blob], "photo.png", { type: "image/png" });
    const date = new Date(file.lastModified);
    const optionMonth = { month: "long" };

    const getDate = date.getDate();
    const getMonth = date.toLocaleString('default', optionMonth);
    const getYears = date.getFullYear();
    const fullDate = `${getDate} ${getMonth} ${getYears}`

    const getHours = date.getHours();
    const getMinutes = date.getMinutes().toString().padStart(2, "0");;
    const times = `${getHours}:${getMinutes}`;


    // Sekarang, 'file' adalah objek File yang dapat Anda gunakan atau unggah
    console.log("File:", file);
    setDatas({
      filePhoto: URL.createObjectURL(file),
      times: times,
      date: fullDate,
      status: status,
    });


    const formData = new FormData();
    formData.append('image', file);
    formData.append('checkin', date);
    formData.append('absen', "Work From Office");

    fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/absensi/create', {
      method: 'POST',
      headers: {
        // Tambahkan token ke header permintaan
        Authorization: `Bearer ${token}`,
      },
      body: (formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Absen Berhasil:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });


  const handleClose = () => {
    WFO(false);
  };

  const updateRealtime = () => {
    const time = new Date();
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const second = time.getSeconds().toString().padStart(2, "0");
    hours = hours % 12 || 12;
    const timeFormatted = `${hours}:${minutes}:${second}`;
    setWaktu(timeFormatted);

    const year = time.getFullYear();
    const month = time.toLocaleString("default", { month: "long" });
    const day = time.getDate().toString().padStart(2, "0");
    const dateFormatted = `${day} ${month} ${year}`;
    setTanggal(dateFormatted);
  };

  useEffect(() => {
    if (!success) {
      const id = setInterval(() => {
        updateRealtime();
      }, 1000);

      // Bersihkan interval saat komponen tidak lagi digunakan atau captureTime diubah
      return () => {
        clearInterval(id);
      };
    } else {
      updateRealtime();
    }
  }, [success]);

  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices];
    },
    [webcamRef]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);



  return (
    <div className="absolute w-full h-full inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-8 w-[632px] h-[600px] rounded-lg">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center"
          >
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className="flex mb-4">
          <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
            <Icon icon="solar:camera-minimalistic-broken" />
          </div>
          <div className="flex flex-col px-2 ">
            <span className=" font-semibold">Work From Office</span>
            <div className="flex gap-x-2">
              <span className="font-bold text-s text-primary ">{waktu}</span>
              <span className="font-bold text-s text-primary ">{tanggal}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-start item mt-6">
          {devices.map((device, key) => (
            <div key={key} className="relative">
              <Webcam
                className=""
                audio={false}
                videoConstraints={{ deviceId: device.deviceId }}
                ref={webcamRef}
                screenshotFormat="image/png"
                mirrored={true}
              />
              <button
                onClick={() => {
                  console.log("Button clicked");
                  capturePhoto();
                }}
                className="bg-[#A332C3] absolute bottom-0 left-[250px] m-2 p-2 rounded-full"
              >
                <Icon icon="system-uicons:camera" width="28.5" color="white" />
              </button>
              {success && (
                <Result datas={datas} capturePhoto={capturePhoto} checkInPopUp={checkInPopUp} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Camera;
