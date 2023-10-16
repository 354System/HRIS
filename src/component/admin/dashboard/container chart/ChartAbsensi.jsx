import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
const GrafikAbsensi = () => {
    const DataAbsensi = [
        {
            id: 1,
            divisi: 'Marketing',
            checkIn: '09:24:24',
            checkOut: '18:00:24',
            date: 'Oct 12 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 2,
            divisi: 'Sales',
            checkIn: '08:24:24',
            checkOut: '18:00:24',
            date: 'Oct 12 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 3,
            divisi: 'IT',
            checkIn: '09:00:24',
            checkOut: '18:00:24',
            date: 'Oct 12 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 4,
            divisi: 'Legal',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 12 2023',
            ket: 'Absent',
        },
        {
            id: 5,
            divisi: 'API',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            ket: 'Sakit',
            date: 'Oct 12 2023',
            ket: 'Absent',
        },
        {
            id: 1,
            divisi: 'Marketing',
            checkIn: '09:00:24',
            checkOut: '18:00:24',
            date: 'Oct 21 2023',
            ket: 'Hadir',
            status: 'Work From Office',

            image: 'src/assets/image1584.png',
        },
        {
            id: 2,
            divisi: 'Sales',
            checkIn: '09:01:56',
            checkOut: '18:00:24',
            date: 'Oct 21 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 3,
            divisi: 'IT',
            checkIn: '09:01:56',
            checkOut: '18:00:24',
            date: 'Oct 21 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 4,
            divisi: 'Legal',
            date: 'Oct 21 2023',
            ket: 'Sakit',
        },
        {
            id: 5,
            divisi: 'API',
            checkIn: '09:01:56',
            checkOut: '18:00:24',
            date: 'Oct 21 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 1,
            divisi: 'Marketing',
            checkIn: '09:01:56',
            checkOut: '18:00:24',
            date: 'Oct 22 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 2,
            divisi: 'Sales',
            date: 'Oct 22 2023',
            ket: 'Sakit',
            desc: 'Saya sakit kepala'
        },
        {
            id: 3,
            divisi: 'IT',
            ket: 'Absent',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 22 2023',
        },
        {
            id: 4,
            divisi: 'Legal',
            checkIn: '09:10:24',
            checkOut: '18:00:24',
            date: 'Oct 22 2023',
            ket: 'Hadir',
        },
        {
            id: 5,
            divisi: 'API',
            ket: 'Hadir',
            checkIn: '09:22:24',
            checkOut: '18:00:24',
            date: 'Oct 22 2023',
        },
        {
            id: 1,
            divisi: 'Marketing',
            ket: 'Hadir',
            checkIn: '09:20:21',
            checkOut: '18:30:53',
            date: 'Oct 23 2023',
            status: 'Work From Office',
        },
        {
            id: 2,
            divisi: 'Sales',
            ket: 'Absent',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 23 2023',
        },
        {
            id: 3,
            divisi: 'IT',
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 23 2023',
        },
        {
            id: 4,
            divisi: 'Legal',
            date: 'Oct 23 2023',
            ket: 'Sakit',
            desc: 'aww acu cakit',
        },
        {
            id: 5,
            divisi: 'API',
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 23 2023',
        },
        {
            id: 1,
            divisi: 'Marketing',
            ket: 'Hadir',
            checkIn: '09:20:21',
            checkOut: '18:30:53',
            date: 'Oct 24 2023',
            status: 'Work From Office',
        },
        {
            id: 2,
            divisi: 'Sales',
            ket: 'Absent',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 24 2023',
        },
        {
            id: 3,
            divisi: 'IT',
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 24 2023',
        },
        {
            id: 4,
            divisi: 'Legal',
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            date: 'Oct 24 2023',
        },
        {
            id: 5,
            divisi: 'API',
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 24 2023',
        },
        {
            id: 1,
            divisi: 'Marketing',
            ket: 'Hadir',
            date: 'Oct 25 2023',
            status: 'Work From Office',
            desc: 'aww acu cakit',
        },
        {
            id: 2,
            divisi: 'Sales',
            ket: 'Hadir',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 25 2023',
        },
        {
            id: 3,
            divisi: 'IT',
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 25 2023',
        },
        {
            id: 4,
            divisi: 'Legal',
            ket: 'Kontol',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            date: 'Oct 25 2023',
        },
        {
            id: 5,
            divisi: 'API',
            ket: 'Vale',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 25 2023',
        },
        {
            id: 1,
            divisi: 'Marketing',
            ket: 'Hadir',
            date: 'Oct 26 2023',
            status: 'Work From Office',
            desc: 'aww acu cakit',
        },
        {
            id: 2,
            divisi: 'Sales',
            ket: 'Hadir',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 26 2023',
        },
        {
            id: 3,
            divisi: 'IT',
            ket: 'Absent',
            checkIn: '09:10:23',
            checkOut: '26:24:10',
            status: 'Work From Office',
            date: 'Oct 26 2023',
        },
        {
            id: 4,
            divisi: 'Legal',
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '26:24:10',
            date: 'Oct 26 2023',
        },
        {
            id: 5,
            divisi: 'API',
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '26:24:10',
            status: 'Work From Office',
            date: 'Oct 26 2023',
        },
        {
            id: 6,
            divisi: 'BACKEND',
            ket: 'Sakit',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 26 2023',
        },
    ]

    const totalKehadiranPerDivisi = DataAbsensi.reduce((accumulator, data) => {
        if (data.ket === 'Hadir') {
          const minggu = data.date;
          if (!accumulator[minggu]) {
            accumulator[minggu] = {};
          }
    
          if (!accumulator[minggu][data.divisi]) {
            accumulator[minggu][data.divisi] = 0;
          }
    
          accumulator[minggu][data.divisi]++;
        }
        return accumulator;
      }, {});
    
      const mingguLabels = Object.keys(totalKehadiranPerDivisi);
      const divisionNames = Array.from(new Set(DataAbsensi.map((data) => data.divisi)));
    
      const divisionData = divisionNames.map((division) => {
        return {
          label: division,
          data: mingguLabels.map((minggu) => {
            const totalHadir = totalKehadiranPerDivisi[minggu][division] || 0;
            const totalID = DataAbsensi.filter((data) => {
              return data.date === minggu && data.divisi === division && data.ket === 'Hadir';
            }).length;
    
            return totalID > 0 ? (totalHadir / totalID) * 100 : 0;
          }),
          backgroundColor: 'rgba(128, 0, 128, 0.8)',
          borderColor: 'rgba(128, 0, 128, 0.8)',
          borderWidth: 1,
        };
      });
    
      const barData = {
        labels: mingguLabels,
        datasets: divisionData,
      };

      console.log(divisionData);
    
      const barOptions = {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: function (value) {
                return value + '%';
              },
            },
          },
        },
      };




    const hadirPerTanggal = DataAbsensi.reduce((accumulator, data) => {
        if (data.ket === 'Hadir') {
            const tanggal = new Date(data.date);
            const tanggalFormatted = `${tanggal.getDate()} ${tanggal.toLocaleString('default', { month: 'short' })} ${tanggal.getFullYear()}`;
            if (accumulator[tanggalFormatted]) {
                accumulator[tanggalFormatted].count += 1;
            } else {
                accumulator[tanggalFormatted] = {
                    count: 1,
                };
            }
        }
        return accumulator;
    }, {});

    const labels = Object.keys(hadirPerTanggal);
    const data = labels.map((label) => {
        const totalHadir = hadirPerTanggal[label].count;
        const totalID = DataAbsensi.filter(data => {
            const tanggal = new Date(data.date);
            const tanggalFormatted = `${tanggal.getDate()} ${tanggal.toLocaleString('default', { month: 'short' })} ${tanggal.getFullYear()}`;
            return tanggalFormatted === label;
        }).length;

        const percentage = (totalHadir / totalID) * 100;
        return percentage;
    });

    const options = {
        scales: {
            x: {
                type: 'category',
            },
            y: {
                min: 0,      // Nilai minimum pada sumbu Y
                max: 100,     // Nilai maksimum pada sumbu Y
                stepSize: 20, // Langkah antara setiap label pada sumbu Y
                ticks: {
                    stepSize: 20,
                    callback: function (value) {
                        return value + '%';
                    },
                },
            },
        },
    };

    useEffect(() => {
        Chart.defaults.category = {
            scales: {
                x: {
                    type: 'category',
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                },
            },
        };
    }, []);

    return (
        <div className='w-full bg-white p-5'>
            <div className='mb-5'>
                <h1 className='text-2xl font-bold text-primary '>Attendance Comparison Chart</h1>
            </div>
            <div className='h-80'>
                <Line data={{
                    labels: labels,
                    datasets: [{
                        data: data,
                        yAxisID: 'y',
                        fill: true,
                        borderColor: 'purple',
                        backgroundColor: 'rgba(128, 0, 128, 0.2)',
                        tension: 0.4,
                        pointBackgroundColor: 'white', // Warna latar belakang titik dengan tingkat transparansi
                        pointBorderColor: 'rgba(128, 0, 128, 0.8)', // Warna garis tepi titik dengan tingkat transparansi
                        pointRadius: 5, // Mengatur ukuran titik
                        pointHoverRadius: 7, // Ukuran titik saat dipoles (hover)
                    }]
                }} options={options} />
            </div>
            <div>
                <Bar data={barData} options={barOptions} />
            </div>
        </div>
    );
}
export default GrafikAbsensi;
