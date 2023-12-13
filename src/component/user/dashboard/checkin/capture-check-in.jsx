import { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Result from "./result";
import { usePresent } from "../../../../api/attendance/usePresent";
import format from "date-fns/format";
import { Spinner } from "@chakra-ui/react";
import { IoCamera } from "react-icons/io5";
const CaptureCheckin = ({ checkInPopUp, status, refetchPresence }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [resultPopUp, setResultPopUp] = useState(false);
  const [devices, setDevices] = useState([]);
  const webcamRef = useRef(null);
  const [times, setTimes] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState(0);
  const [radius, setRadius] = useState(0);
  const [dataAbsensi, setDataAbsensi] = useState({
    filePhoto: null,
    times: "",
    date: "",
    status: "",
  });

  // realtime
  const updateRealtime = () => {
    const time = new Date();
    const timesFormatted = format(time, "HH:mm:ss");
    setTimes(timesFormatted);

    const dateFormatted = format(time, "dd MMMM yyyy");
    setDate(dateFormatted);
  };

  // update realtime
  useEffect(() => {
    if (!resultPopUp) {
      const intervalId = setInterval(() => {
        updateRealtime();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      updateRealtime();
    }
  }, [resultPopUp]);

  // aturan react webcam
  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
    },
    []
  );

  // aturan react webcam
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, []);

  // cek lokasi user
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        const companyLatitude = -6.236607954174483;
        const companyLongitude = 106.75056562318132;

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

          return distance;
        }

        const allowedDistance = 12;
        const distance = calculateDistance(companyLatitude, companyLongitude, userLatitude, userLongitude);
        setRadius(allowedDistance);
        setDistance(distance);
      });
      // memberi perintah untuk memeriksa lokasi user
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'denied') {
            setErrorMsg('Please Turn on Location');
          }
        });
      }
    } else {
      console.log('Geolokasi tidak didukung.');
    }
  }, []);

  const { mutate, isPending } = usePresent({
    onSuccess: (data) => {
      refetchPresence();
      console.log(data);
      setResultPopUp(true);
    },
    onError: (error) => {
      console.log(error);
      setErrorMsg('an Error Occurred During Absence');
    },
  })

  // mendapat foto dan data absensi
  const handleSubmit = async () => {
    try {
      // foto type base64
      const imageSrc = webcamRef.current.getScreenshot();

      if (!imageSrc) {
        console.log('Gagal mengambil gambar dari kamera');
        return;
      }

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

      const now = new Date();
      const formattedDate = format(now, "dd-MMM-yyyy");
      const checkInFormatted = format(now, "dd-MMM-yyyy, HH:mm:ss");

      setDataAbsensi({
        filePhoto: file,
        times: times,
        date: formattedDate,
        status: status,
      });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("checkin", checkInFormatted);
      formData.append("absen", status);

      if (status === 'Work From Office') {
        if (distance <= radius) {
          mutate(formData);
        } else {
          console.log('');
          setErrorMsg('Anda tidak berada di jarak yang ditentukan');
        }
      } else {
        mutate(formData);
      }
    } catch (error) {
      console.error('Error dalam capturePhoto:', error);
      setErrorMsg('Error dalam capturePhoto:', error);
    }
  };

  return (
    <>
      {resultPopUp ? (
        <Result datas={dataAbsensi} checkInPopUp={checkInPopUp} />
      ) :
        <div className="fixed w-full min-h-screen inset-0 flex items-center justify-center z-20 bg-black/60">
          <div className="fixed top-1/2 transform -translate-y-1/2 bg-white p-6 laptop:w-[650px] laptop:h-[90%] hp:w-11/12 hp:h-3/4 rounded-lg">
            <div onClick={() => checkInPopUp(false)} className="flex justify-end">
              <button
                className="absolute top-0 right-0 -mr-3 -mt-3 bg-black transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg w-[41.64px] h-[41.64px] rounded-full flex items-center justify-center">
                <Icon icon="ion:close" color="white" width="17.44" />
              </button>
            </div>
            <div className="flex mb-4 items-center gap-2">
              <div className="bg-purple rounded-full laptop:w-14 laptop:h-14 hp:w-12 hp:h-12 flex items-center justify-center">
                <IoCamera size={30} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">{status}</span>
                <div className="flex gap-x-2">
                  <span className="font-bold text-s text-primary">{times}</span>
                  <span className="font-bold text-s text-primary">{date}</span>
                </div>
                {errorMsg && <span className="hp:text-sm text-red-500">{errorMsg}</span>}
              </div>
            </div>
            <div className="w-full h-full ">
              {devices.map((device, key) => (
                <div key={key} className="relative h-[85%]">
                  <Webcam
                    className="rounded-lg h-full"
                    audio={false}
                    videoConstraints={{ deviceId: device.deviceId }}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    mirrored={true}
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-purple hover:bg-purple-dark hover:scale-105 transition-all duration-200 mb-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 rounded-full flex items-center justify-center"
                  >
                    {isPending ? <Spinner /> : <Icon icon="system-uicons:camera" width="28.5" color="white" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default CaptureCheckin;
