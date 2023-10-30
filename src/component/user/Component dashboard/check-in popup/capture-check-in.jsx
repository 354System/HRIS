import React, { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Result from "./result";

const Camera = ({ checkInPopUp, status }) => {

  //result popup
  const [resultPopUp, setResultPopUp] = useState(false);
  //aturan react webcam
  const [devices, setDevices] = useState([]);
  const webcamRef = useRef(null);
  //realtime
  const [times, setTimes] = useState("");
  const [date, setDate] = useState("");
  //location
  const [distance, setDistance] = useState(0);
  const [radius, setRadius] = useState(0);
  //data absensi
  const [dataAbsensi, setDataAbsensi] = useState({
    filePhoto: null,
    times: "",
    status: "",
  });

  //handle close popup
  const handleClose = () => {
    checkInPopUp(false);
  };

  //realtime
  const updateRealtime = () => {
    const time = new Date();
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const second = time.getSeconds().toString().padStart(2, "0");
    hours = hours % 12 || 12;
    const timeFormatted = `${hours}:${minutes}:${second}`;
    setTimes(timeFormatted);

    const year = time.getFullYear();
    const month = time.toLocaleString("default", { month: "long" });
    const day = time.getDate().toString().padStart(2, "0");
    const dateFormatted = `${day} ${month} ${year}`;
    setDate(dateFormatted);
  };

  //update realtime
  useEffect(() => {
    if (!resultPopUp) {
      setInterval(() => {
        updateRealtime();
      }, 1000);
    } else{
      updateRealtime();
    }

  }, [resultPopUp]);

  //aturam react webcam
  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices];
    },
    [webcamRef]
  );

  //aturan react webcam
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  //cek lokasi user
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        const companyLatitude = ' -6.236607954174483'
        const companyLongitude = '106.75056562318132'

        // Selanjutnya, Anda dapat memeriksa jarak antara titik awal dan lokasi pengguna.
        function calculateDistance(lat1, lon1, lat2, lon2) {
          const earthRadius = 6371; // Radius bumi dalam kilometer
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = earthRadius * c;

          return distance; // Jarak dalam kilometer
        }
        const allowedDistance = 20; // 10 meter dalam kilometer
        const distance = calculateDistance(companyLatitude, companyLongitude, userLatitude, userLongitude);
        setRadius(allowedDistance);
        setDistance(distance);
      });
      //memberi perintah untuk memeriksa lokasi user
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'denied') {
            // Layanan lokasi tidak diizinkan, tampilkan pesan kesalahan atau perintah untuk mengaktifkan lokasi.
          }
        });
      }
    } else {
      console.log('Geolokasi tidak didukung.');
    }
  }, []);

  //mendapat foto dan data absensi
  const capturePhoto = useCallback(async () => {

    //foto type base64
    const imageSrc = webcamRef.current.getScreenshot();

    // Convert base64 ke file
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

    const Times = `${times}`;
    const Date = `${date}`;
    setDataAbsensi({
      filePhoto: file,
      times: Times,
      date: Date,
      status: status,
    });
  });

  //handle submit
  const handleSubmit = async () => {
    //mengambil token dari localstorage
    const token = localStorage.getItem('token');
    //cek jarak
    if (distance <= radius) {
      //hit endpoint absensi kehadiran
      const checkIn = dataAbsensi.times
      const photoFile = dataAbsensi.filePhoto
      const status = dataAbsensi.status
      try {
        setResultPopUp(true);
        const response = await fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/absensi/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ absen: status, checkin: checkIn }),
        });

        if (response.ok) {
          const res = await response.json();
          console.log(res);
        } else {
          // Handle error response
          console.error('Request failed with status:', response.status);
          // Mungkin Anda ingin menampilkan pesan kesalahan kepada pengguna di sini
        }
      } catch (error) {
        console.error('Fetch error:', error);
        // Tangani kesalahan fetch di sini
      }
    } else {
      console.log('anda tidak berada di jarak yang ditentukan');
    }
  }

  return (
    <div className="absolute w-full h-full inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-8 w-[632px] h-[600px] rounded-lg">
        <div onClick={handleClose} className="flex justify-end">
          <button
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
              <span className="font-bold text-s text-primary ">{times}</span>
              <span className="font-bold text-s text-primary ">{date}</span>
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
                  capturePhoto();
                  handleSubmit();
                }}
                className="bg-[#A332C3] absolute bottom-0 left-[250px] m-2 p-2 rounded-full"
              >
                <Icon icon="system-uicons:camera" width="28.5" color="white" />
              </button>
              {resultPopUp && (
                <Result datas={dataAbsensi} checkInPopUp={checkInPopUp} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Camera;
