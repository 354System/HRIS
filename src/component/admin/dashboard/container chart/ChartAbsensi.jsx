import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
import { DataAbsensi } from '../../../../mockdata/DataAbsensi';
const ChartAbsensi = () => {

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
        <div className='w-full bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold text-primary '>Attendance Comparison Chart</h1>
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
        </div >
    );
}
export default ChartAbsensi;
