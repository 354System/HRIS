import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Histori = () => {

  const [data, setData] = useState([]);
  const [id, setId] = useState('');

  function checkInStyle(data) {
    if (data.type === 'Absent') {
      return 'text-red';
    } else if (data.type === 'Work from Office' || data.type === 'Late') {
      return 'text-yellow';
    } else {
      return 'text-purple';
    }
  }

  function statusStyle(data) {
    if (data.type === 'Absent') {
      return 'bg-red/20 text-red p-1';
    } else if (data.type === 'Present') {
      return 'text-purple bg-purple/20 p-1';
    } else if (data.type === 'Late') {
      return 'text-yellow bg-yellow/20 p-1';
    } else {
      return 'bg-[#E6EFFC] text-purple';
    }
  }

  data?.forEach(entry => {
    const checkIn = new Date(entry.checkin);
    const checkOut = new Date(entry.checkout);
  
    // Calculate workhours
    const workHoursResult = checkOut - checkIn;
    const hours = Math.floor(workHoursResult / 3600000);
    const minutes = Math.floor((workHoursResult % 3600000) / 60000);
    const workHours = `${hours}h ${minutes}m`;
  
    // Add a new property 'workHours' to the existing object
    entry.workHours = workHours;
  });

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
      .then(data => {
        setId(data.user_info.id); // Menggunakan data.id, karena objek respon memiliki properti "id"
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])
  useEffect(() => {
    fetch(`https://fzsxpv5p-3000.asse.devtunnels.ms/absensi/by/${id}`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
    return formattedDate;
  };





return (
  <div className="w-full bg-white">
    <div className="mt-2">
      <table className="w-full">
        <thead className="">
          <tr className="border-b-4 border-t-2 text-grey text-left">
            <th className="p-4">Date</th>
            <th>
              <div className="flex items-center">
                <span>Status</span>
                <Icon
                  icon="bxs:up-arrow"
                  color="#20285a"
                  width="5.88"
                  rotate={2}
                  className="ml-1"
                />
              </div>
            </th>
            <th className="flex items-center mt-4">
              Check-in
              <Icon
                icon="bxs:up-arrow"
                color="#20285a"
                width="5.88"
                rotate={2}
                className="ml-1"
              />
            </th>
            <th>
              <div className="flex items-center">
                <span>Check-out</span>
                <Icon
                  icon="bxs:up-arrow"
                  color="#20285a"
                  width="5.88"
                  rotate={2}
                  className="ml-1"
                />
              </div>
            </th>
            <th>
              <div className="flex items-center">
                <span>Work hours</span>
                <Icon
                  icon="bxs:up-arrow"
                  color="#20285a"
                  width="5.88"
                  rotate={2}
                  className="ml-1"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr className="border-b" key={item.date}>
              <td className="text-[#252C58] p-4">{formatDate(item.date)}</td>
              <td className="bg-white"><span className={`text-purple bg-[#E6EFFC] ${statusStyle(item)}`}>{item.absen}</span></td>
              <td className={`text-purple ${checkInStyle(item)}`}>{item.checkin ? new Date(item.checkin).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-:-:-'}</td>
              <td className={`text-purple ${checkInStyle(item)}`}>{item.checkout ? new Date(item.checkout).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-:-:-'}</td>
              <td className="text-primary">{item.workHours === 'NaNh NaNm' ? '-:-:-' : item.workHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default Histori;
