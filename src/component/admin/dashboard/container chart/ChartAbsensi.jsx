import React from 'react';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
const GrafikAbsensi = () => {
    const DataAbsensi = [
        {
            id: 1,
            checkIn: '09:24:24',
            checkOut: '18:00:24',
            date: 'Oct 12 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 2,
            checkIn: '08:24:24',
            checkOut: '18:00:24',
            date: 'Oct 12 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 3,
            checkIn: '09:00:24',
            checkOut: '18:00:24',
            date: 'Oct 12 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 4,
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 12 2023',
            ket: 'Absent',
        },
        {
            id: 5,
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            ket: 'Sakit',
            date: 'Oct 12 2023',
            ket: 'Absent',
        },
        {
            id: 1,
            checkIn: '09:00:24',
            checkOut: '18:00:24',
            date: 'Oct 13 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 2,
            checkIn: '09:01:56',
            checkOut: '18:00:24',
            date: 'Oct 13 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 3,
            checkIn: '09:01:56',
            checkOut: '18:00:24',
            date: 'Oct 13 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 4,
            date: 'Oct 13 2023',
            ket: 'Sakit',
        },
        {
            id: 5,
            checkIn: '09:01:56',
            checkOut: '18:00:24',
            date: 'Oct 13 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 1,
            checkIn: '09:01:56',
            checkOut: '18:00:24',
            date: 'Oct 14 2023',
            ket: 'Hadir',
            status: 'Work From Office',
            image: 'src/assets/image1584.png',
        },
        {
            id: 2,
            date: 'Oct 14 2023',
            ket: 'Sakit',
            desc: 'Saya sakit kepala'
        },
        {
            id: 3,
            ket: 'Absent',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 14 2023',
        },
        {
            id: 4,
            checkIn: '09:10:24',
            checkOut: '18:00:24',
            date: 'Oct 14 2023',
            ket: 'Hadir',
        },
        {
            id: 5,
            ket: 'Hadir',
            checkIn: '09:14:24',
            checkOut: '18:00:24',
            date: 'Oct 14 2023',
        },
        {
            id: 1,
            ket: 'Hadir',
            checkIn: '09:20:21',
            checkOut: '18:30:53',
            date: 'Oct 15 2023',
            status: 'Work From Office',
        },
        {
            id: 2,
            ket: 'Absent',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 15 2023',
        },
        {
            id: 3,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 15 2023',
        },
        {
            id: 4,
            date: 'Oct 15 2023',
            ket: 'Sakit',
            desc: 'aww acu cakit',
        },
        {
            id: 5,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 15 2023',
        },
        {
            id: 1,
            ket: 'Hadir',
            checkIn: '09:20:21',
            checkOut: '18:30:53',
            date: 'Oct 16 2023',
            status: 'Work From Office',
        },
        {
            id: 2,
            ket: 'Absent',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 16 2023',
        },
        {
            id: 3,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 16 2023',
        },
        {
            id: 4,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            date: 'Oct 16 2023',
        },
        {
            id: 5,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 16 2023',
        },
        {
            id: 1,
            ket: 'Hadir',
            date: 'Oct 17 2023',
            status: 'Work From Office',
            desc: 'aww acu cakit',
        },
        {
            id: 2,
            ket: 'Hadir',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 17 2023',
        },
        {
            id: 3,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 17 2023',
        },
        {
            id: 4,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            date: 'Oct 17 2023',
        },
        {
            id: 5,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 17 2023',
        },
        {
            id: 1,
            ket: 'Hadir',
            date: 'Oct 18 2023',
            status: 'Work From Office',
            desc: 'aww acu cakit',
        },
        {
            id: 2,
            ket: 'Hadir',
            checkIn: '00:00:00',
            checkOut: '00:00:00',
            date: 'Oct 18 2023',
        },
        {
            id: 3,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 18 2023',
        },
        {
            id: 4,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            date: 'Oct 18 2023',
        },
        {
            id: 5,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 18 2023',
        },
        {
            id: 6,
            ket: 'Hadir',
            checkIn: '09:10:23',
            checkOut: '18:24:10',
            status: 'Work From Office',
            date: 'Oct 18 2023',
        },
    ]

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
                beginAtZero: true,
                max: 100,
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
        <Line data={{
            labels: labels,
            datasets: [{
                label: "Hadir",
                data: data,
            }]
        }} options={options} />
    );
}
export default GrafikAbsensi;
