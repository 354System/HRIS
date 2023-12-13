import RealtimeInsightBox from "./Component dashboard/RealtimeBox";
import OnTimeBox from "./Component dashboard/OneTimeBox";
import AbsenBox from "./Component dashboard/AbsenBox";
import LeaveBox from "./Component dashboard/LeaveBox";
import LateBox from "./Component dashboard/LateBox";
import WorkingDayThismonthBox from "./Component dashboard/WorkingDayThismonthBox";
import PremisionBox from "./Component dashboard/PremisionBox";
import Histori from "./Component dashboard/history";
import SidebarmenuUser from "./Component dashboard/Sidebarmenu";
import NavbarUser from "./Component dashboard/Navbar";
import { useEffect, useState } from "react";

const DashboardUser = () => {
  const [absentData, setAbsentData] = useState([]);

  useEffect(() => {
    // Fetch data from backend when the component mounts
    fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/user/user-info', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Mengembalikan promise dari response.json()
        return response.json();
      })
      .then((data) => {
        const id = data.user_info.id
        fetch(`https://fzsxpv5p-3000.asse.devtunnels.ms/absensi/by/${id}`, {
          method: 'GET',
        }).then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        }).then(data => {
          setAbsentData(data);
        })
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])

  return (
    <div className="w-full min-h-screen flex absolute bg-gray-200">
      <div className="p-4 hp:hidden laptop:flex ">
        <SidebarmenuUser />
      </div>
      <div className="w-full p-4">
        <NavbarUser title="Dashboard" />
        <div className="laptop:flex hp:hidden flex-col gap-6 mt-32">
          <div className="w-full  flex h-72 gap-6">
            <RealtimeInsightBox />
            <div className="w-full flex flex-col gap-8">
              <div className="flex h-1/2 gap-10 ">
                <OnTimeBox dataAbsent={absentData} />
                <AbsenBox dataAbsent={absentData} />
                <LeaveBox />
              </div>
              <div className="flex h-1/2 items-end gap-10 ">
                <LateBox dataAbsent={absentData}/>
                <WorkingDayThismonthBox dataAbsent={absentData} />
                <PremisionBox />
              </div>
            </div>
          </div>
        </div>
        <div className="laptop:hidden flex flex-col mt-4 gap-2 hp:mr-4 hp:flex">
          <div className="flex h-1/4 gap-2 mt-24">
            <RealtimeInsightBox />
          </div>
          <div className="flex h-1/4 gap-2 mt-4">
            <PremisionBox />
          </div>
          <div className="flex h-1/4 gap-2 mt-2">
            <OnTimeBox />
            <AbsenBox />
          </div>
          <div className="flex h-1/4 gap-2">
            <LateBox />
            <LeaveBox />
          </div>
          <div className="flex max-h-1/4 gap-2">
            <WorkingDayThismonthBox />
          </div>
        </div>
        <div className="mt-10">
          <h1 className="font-bold text-[#252C58] px-2">Attendance History</h1>
          <Histori />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
