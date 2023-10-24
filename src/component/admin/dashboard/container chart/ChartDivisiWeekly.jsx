import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
import { DataAbsensi } from "../../../../mockdata/DataAbsensi";
import { useEffect, useState } from "react";
import { DataKaryawan } from "../../../../mockdata/DataKaryawan";

const ChartDivisiWeekly = () => {

    const [dopamen, setDopamen] = useState([]);

    useEffect(() => {
        const combinedData = DataAbsensi.map((absen) => {
            const karyawan = DataKaryawan.find((karyawan) => absen.id === karyawan.id);
            const { employe, divisi, departement } = karyawan || {};
            return {
                employe,
                divisi,
                departement,
                ...absen // Tambahkan properti absensi ke data karyawan
            };
        });
        setDopamen(combinedData);
    }, []);

    // Ambil tanggal unik dari data `dopamen`
    const uniqueDates = Array.from(new Set(dopamen.map(data => data.date)));
    // Urutkan tanggal secara descending (terbaru dulu)
    const sortedDates = uniqueDates.sort((a, b) => new Date(b) - new Date(a));
    // Ambil 5 tanggal terakhir
    const last5Dates = sortedDates.slice(0, 5);
    // Filter data yang tanggalnya termasuk dalam 5 tanggal terakhir
    const filteredData = dopamen.filter(data => last5Dates.includes(data.date));

    const totalKehadiranPerDivisi = filteredData.reduce((accumulator, data) => {
        if (data.ket === 'Hadir') {
            const perTanggal = data.date;
            if (!accumulator[perTanggal]) {
                accumulator[perTanggal] = {};
            }

            if (!accumulator[perTanggal][data.departement]) {
                accumulator[perTanggal][data.departement] = 0;
            }

            accumulator[perTanggal][data.departement]++;
        }
        return accumulator;
    }, {});

    const perTanggalLabels = Object.keys(totalKehadiranPerDivisi);
    const departementNames = Array.from(new Set(dopamen.map((data) => data.departement)));

    const divisionData = departementNames.map((departement) => {
        const array = perTanggalLabels.map((perTanggal) => {
            const totalHadir = totalKehadiranPerDivisi[perTanggal][departement] || 0;
            const totalID = dopamen.filter((data) => {
                return data.date === perTanggal && data.departement === departement && data.ket === 'Hadir';
            }).length;

            return totalID > 0 ? (totalHadir / totalID) * 100 : 0;
        })

        const tot = array.reduce((accumulator, currentValue) => accumulator + currentValue / 5, 0);

        return {
            label: departement,
            data: tot,
            backgroundColor: 'rgba(128, 0, 128, 0.8)',
            borderColor: 'rgba(128, 0, 128, 0.8)',
            borderWidth: 1,
        };
    });

    const barData = {
        labels: departementNames,
        datasets: [{
            label: 'Hadir',
            data: divisionData.map((data) => data.data),
            backgroundColor: divisionData.map((data) => data.backgroundColor),
            borderColor: divisionData.map((data) => data.borderColor),
            borderWidth: 1,
        }]
    };

    const barOptions = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                max: 100,
                barThickness: 50,
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
        <div className="w-full h-full flex flex-col justify-between bg-white p-5 rounded-lg">
            <h1 className='text-2xl font-bold text-primary '>Weekly Attendence</h1>
            <Bar data={barData} options={barOptions} />
        </div>
    )
}
export default ChartDivisiWeekly
