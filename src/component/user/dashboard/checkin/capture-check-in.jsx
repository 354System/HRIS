import { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Result from "./result";
import { usePresent } from "../../../../api/attendance/usePresent";
import format from "date-fns/format";
import { Spinner } from "@chakra-ui/react";
const Camera = ({ checkInPopUp, status, refetch }) => {
  // result popup
  const [resultPopUp, setResultPopUp] = useState(false);
  // aturan react webcam
  const [devices, setDevices] = useState([]);
  const webcamRef = useRef(null);
  // realtime
  const [times, setTimes] = useState("");
  const [date, setDate] = useState("");
  // location
  const [distance, setDistance] = useState(0);
  const [radius, setRadius] = useState(0);
  // data absensi
  const [dataAbsensi, setDataAbsensi] = useState({
    filePhoto: null,
    times: "",
    date: "",
    status: "",
  });

  // handle close popup

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

          return distance; // Jarak dalam kilometer
        }

        const allowedDistance = 20; // 10 meter dalam kilometer
        const distance = calculateDistance(companyLatitude, companyLongitude, userLatitude, userLongitude);
        setRadius(allowedDistance);
        setDistance(distance);
      });
      // memberi perintah untuk memeriksa lokasi user
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

  const { mutate, isPending } = usePresent({
    onSuccess: (data) => {
      console.log(data);
      setResultPopUp(true);
      refetch
    },
    onError: (error) => {
      console.log(error);
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

      setDataAbsensi({
        filePhoto: file,
        times: times,
        date: formattedDate,
        status: status,
      });

      // mengirim http request ke server
      if (distance <= radius) {
        mutate({
          checkin: Date(formattedDate),
          absen: status,
        });
      } else {
        console.log('anda tidak berada di jarak yang ditentukan');
      }
    } catch (error) {
      console.error('Error dalam capturePhoto:', error);
    }
  };

  return (
    <div className="absolute w-full h-full inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-8 w-[650px] h-[600px] rounded-lg">
        <div onClick={() => checkInPopUp(false)} className="flex justify-end">
          <button
            className="absolute top-0 right-0 -mr-3 -mt-3 bg-black w-[41.64px] h-[41.64px] rounded-full flex items-center justify-center">
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
        <div className="flex justify-center">
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
                onClick={handleSubmit}
                className="bg-purple mb-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 rounded-full"
              >
                {isPending ? <Spinner /> : <Icon icon="system-uicons:camera" width="28.5" color="white" />}
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
