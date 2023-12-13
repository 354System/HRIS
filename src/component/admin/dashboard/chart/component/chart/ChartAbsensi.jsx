import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import { format } from 'date-fns';

const ChartAbsensi = ({ data: DataAbsensi }) => {

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const today = new Date();
    const dateArray = Array.from({ length: 7 }, (_, index) => {
        const day = new Date(today);
        day.setDate(today.getDate() - (6 - index));
        return format(day, 'dd MMM yyyy');
    });

    const latePerDate = DataAbsensi?.reduce((accumulator, data) => {
        const tanggal = new Date(data.date);

        // Check if the data is within the last 7 days
        if (tanggal >= sevenDaysAgo && data.type === 'Late') {
            const tanggalFormatted = format(tanggal, 'dd MMM yyyy');
            accumulator[tanggalFormatted] = accumulator[tanggalFormatted] || { count: 0 };
            accumulator[tanggalFormatted].count += 1;
        }

        return accumulator;
    }, {});

    const onTimePerDate = DataAbsensi?.reduce((accumulator, data) => {
        const tanggal = new Date(data.date);

        if (tanggal >= sevenDaysAgo && data.type === 'Present') {
            const tanggalFormatted = format(tanggal, 'dd MMM yyyy');
            accumulator[tanggalFormatted] = accumulator[tanggalFormatted] || { count: 0 };
            accumulator[tanggalFormatted].count += 1;
        }
        return accumulator;
    }, {});
    console.log(onTimePerDate);

    // Isi nilai 0 untuk tanggal-tanggal yang tidak memiliki data
    DataAbsensi && dateArray.forEach((tanggal) => {
        const formattedDate = format(new Date(tanggal), "dd MMM yyyy");
        if (!latePerDate[formattedDate]) {
            latePerDate[formattedDate] = { count: 0 };
        }
        if (!onTimePerDate[formattedDate]) {
            onTimePerDate[formattedDate] = { count: 0 };
        }
    });

    const lateData = DataAbsensi && Object.entries(latePerDate)
        .map(([date, data]) => ({
            date,
            count: data.count,
        })).sort((a, b) => new Date(a.date) - new Date(b.date))

    const onTimeData = DataAbsensi && Object.entries(onTimePerDate).map(([date, data]) => ({
        date,
        count: data.count,
    })).sort((a, b) => new Date(a.date) - new Date(b.date))

    const optionsLaptop = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to dynamically change size
        scales: {
            x: {
                type: 'category',
                ticks: {
                    autoSkip: false, // prevents auto skipping of labels
                    minRotation: 0, // sets the rotation angle to 0 degrees
                    maxRotation: 0, // sets the rotation angle to 0 degrees
                },
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 5,
                // ... other configurations
                ticks: {
                    // ... other configurations
                    stepSize: 1,
                    callback: function (value) {
                        return value;
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top', // Adjust the legend position
            },
        },
    };
    const optionsHp = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to dynamically change size
        scales: {
            x: {
                type: 'category',
                ticks: {
                    autoSkip: false, // prevents auto skipping of labels
                    minRotation: 90, // sets the rotation angle to 90 degrees
                    maxRotation: 90, // sets the rotation angle to 90 degrees
                },
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 5,
                // ... other configurations
                ticks: {
                    // ... other configurations
                    stepSize: 1,
                    callback: function (value) {
                        return value;
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top', // Adjust the legend position
            },
        },
    };

    return (
        <div className='w-full h-full flex flex-col justify-center items-center bg-white p-5 rounded-l-lg'>
            <h1 className='text-2xl font-bold text-primary'>Attendance Comparison Chart</h1>
            {/* laptop */}
            <div className='w-full h-64 hp:hidden'>
                <Line
                    data={{
                        labels: dateArray,
                        datasets: [
                            {
                                label: 'Late',
                                data: lateData?.map((data) => data.count),
                                yAxisID: 'y',
                                fill: true,
                                borderColor: 'red',
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                tension: 0.1,
                                pointBackgroundColor: 'red',
                                pointBorderColor: 'rgba(255, 0, 0, 0.8)',
                                pointRadius: 3,
                                pointHoverRadius: 7,
                            },
                            {
                                label: 'On Time',
                                data: onTimeData?.map((data) => data.count),
                                yAxisID: 'y',
                                fill: true,
                                borderColor: 'green',
                                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                                tension: 0.1,
                                pointBackgroundColor: 'green',
                                pointBorderColor: 'rgba(0, 128, 0, 0.8)',
                                pointRadius: 3,
                                pointHoverRadius: 7,
                            },
                        ],
                    }}
                    options={optionsLaptop}
                />
            </div>
            {/* hp */}
            <div className='w-full h-64 laptop:hidden'>
                <Line
                    data={{
                        labels: dateArray,
                        datasets: [
                            {
                                label: 'Late',
                                data: lateData?.map((data) => data.count),
                                yAxisID: 'y',
                                fill: true,
                                borderColor: 'red',
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                tension: 0.1,
                                pointBackgroundColor: 'red',
                                pointBorderColor: 'rgba(255, 0, 0, 0.8)',
                                pointRadius: 3,
                                pointHoverRadius: 7,
                            },
                            {
                                label: 'On Time',
                                data: onTimeData?.map((data) => data.count),
                                yAxisID: 'y',
                                fill: true,
                                borderColor: 'green',
                                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                                tension: 0.1,
                                pointBackgroundColor: 'green',
                                pointBorderColor: 'rgba(0, 128, 0, 0.8)',
                                pointRadius: 3,
                                pointHoverRadius: 7,
                            },
                        ],
                    }}
                    options={optionsHp}
                />
            </div>
        </div>
    );
};

export default ChartAbsensi;
