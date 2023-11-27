import { BsSun } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Checkout from "../../checkout/checkout";
import CheckIn from "../../checkin/check-in";
const RealtimeInsightBoxUser = ({ data, refetchPresence }) => {
  const [realtime, setRealtime] = useState("");
  const [date, setDate] = useState("");
  const [checkInPopUp, setCheckInPopUp] = useState(false)
  const [checkOutPopUp, setCheckOutPopUp] = useState(false)
  const [checkInOut, setCheckInOut] = useState({
    checkin: '-:-:-',
    checkout: '-:-:-'
  })
  const [presentDataToday, setPresentDataToday] = useState()
  const [id, setId] = useState('')

  const today = new Date().toLocaleDateString(); // Ambil tanggal hari ini dalam format yang sesuai dengan data Anda (pastikan formatnya sama)

  useEffect(() => {
    const presentDataToday = data?.filter((item) => {
      const itemDate = new Date(item.checkin).toLocaleDateString();

      return itemDate === today;
    });
    setPresentDataToday(presentDataToday)
  }, [data])

  // checkin n checkout
  useEffect(() => {
    if (presentDataToday && presentDataToday.length > 0) {
      const id = presentDataToday[0]._id;

      if (presentDataToday[0].checkin) {
        const getCheckin = new Date(presentDataToday[0].checkin);
        const checkIn = format(getCheckin, "HH:mm");
        setCheckInOut({
          checkin: checkIn,
          checkout: '-:-:-'
        });
        setId(id);
      }
      if (presentDataToday[0].checkout) {
        const getCheckout = new Date(presentDataToday[0].checkout);
        const checkout = format(getCheckout, "HH:mm");
        setCheckInOut((prev) => ({
          ...prev,
          checkout: checkout,
        }));
      }
    }
  }, [presentDataToday]);

  //time
  const updateRealtime = () => {
    const time = new Date();
    const timeFormatted = format(time, "HH:mm:ss a");
    setRealtime(timeFormatted);

    const dateFormatted = format(time, "dd MMMM yyyy");
    setDate(dateFormatted);
  };
  useEffect(() => {
    setInterval(() => {
      updateRealtime();
    }, 1000);
  }, []);

  return (
    <div className="w-64 h-full bg-white rounded flex flex-col justify-between items-center p-5">
      <div className="flex gap-4 w-full items-center">
        <BsSun size={50} className="text-purple" />
        <div className="flex flex-col w-full">
          <span className="font-black text-2xl text-primary tracking-wides">{realtime}</span>
          <span className="text-xs font-medium text-primary">
            Realtime Insight
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-col mb-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-lg text-primary">Check In</p>
              <p className="text-lg text-center text-primary font-bold">{checkInOut.checkin}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg text-primary">Check Out</p>
              <p className="text-lg text-center text-primary font-bold">{checkInOut.checkout}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <span className="text-lg text-primary">Today: </span>
          <span className="text-lg text-primary font-bold">{date}</span>
        </div>
        <div>
          {!presentDataToday?.[0] ? (
            <button
              onClick={() => setCheckInPopUp(true)} // Melakukan check-in
              className="w-52 h-[37px] flex items-center justify-center rounded p-3 bg-purple hover:bg-purple-dark transition duration-200 ease-in-out"
            >
              <span className="text-white text-sm font-bold">Check-In</span>
            </button>
          ) : (
            <>
              {!presentDataToday?.[0].checkout && (
                <button
                  onClick={() => setCheckOutPopUp(true)} // Melakukan check-out
                  className="w-52 h-[37px] flex items-center justify-center rounded p-3 bg-purple hover:bg-purple-dark transition duration-200 ease-in-out"
                >
                  <span className="text-white text-sm font-bold">Check Out</span>
                </button>
              )}
              {presentDataToday && presentDataToday?.[0].checkout ? (
                <Link to="/attendance-history">
                  <button
                    className="w-52 h-[37px] flex items-center justify-center rounded p-3 bg-purple hover:bg-purple-dark transition duration-200 ease-in-out">
                    <span className="text-white text-sm font-bold">View Presence History</span>
                  </button>
                </Link>
              ) : null}
            </>
          )}
          {checkInPopUp ? <CheckIn refetchPresence={refetchPresence} CheckInPopUp={setCheckInPopUp} /> : null}
          {checkOutPopUp ? <Checkout CheckOutPopUp={setCheckOutPopUp} refetch={refetchPresence} id={id} /> : null}
        </div>
      </div>
    </div>
  );
};

export default RealtimeInsightBoxUser;
