import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
const TableRepair = () => {




    function approvalStatus(approval) {
        if (approval === 'Approved') {
            return <td className="pl-2"><span className="text-white bg-green-500 p-2">Approved</span></td>
        } else if (approval === 'Reject') {
            return <td className="pl-2"><span className="text-white bg-red-500 p-2">Rejected</span></td>
        } else {
            return <td className="pl-2"><span className="text-white bg-yellow p-2 rounded-lg">Wait For Response</span></td>
        }
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from backend when the component mounts
        fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/form/all')
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
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
        return formattedDate;
    };




    return (
        <div className="bg-white w-full h-full">
            <div className="flex justify-between items-center">
                <div className="space-x-8 p-6">
                    <button className="w-[160px] h-[40px] bg-[#A332C3] rounded-lg hover:bg-[#6e2882] text-white font-semibold transition-colors duration-200">Perbaikan Device</button>
                    <button className="w-[160px] h-[40px] bg-[#D5D9DD] rounded-lg  text-[#252C58]/50  font-semibold ">Pembelian Barang</button>
                </div>
                <div className="relative flex items-center mr-16">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CiSearch />
                    </div>
                    <input
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        className="w-[470px] h-[40px] pl-10 bg-gray-100 text-sm placeholder:text-grey rounded"
                    />
                </div>

            </div>
            <div className="mt-10">
                <table className="w-full">
                    <thead className="">
                        <tr className="border-b-4 border-t-2 text-grey text-left">
                            <th className="p-4">Date</th>
                            <th className="">Title</th>
                            <th className="p-4">Kerusakan</th>
                            <th className="p-4">Estimasi Biaya</th>
                            <th className="p-4">Approval Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {data.map(item => (
                            <tr key={item.id} className="border-b">
                                <td className="text-black p-2">{formatDate(item.date)}</td>
                                <td className="">{item.title}</td>
                                <td className="p-4">{item.damage}</td>
                                <td className="p-4">{item.cost}</td>
                                <td className="">
                                    {item.description}
                                    {approvalStatus(item.approval)}
                                </td>
                                <td className="flex  gap-x-1 mt-4">
                                    <button className="bg-[#A332C3] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                                        <Icon icon="solar:pen-bold" width="17.36" color="white" />
                                    </button>
                                    <button className="bg-[#FF0000] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                                        <Icon icon="solar:trash-bin-minimalistic-2-bold" width="17.36" color="white" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableRepair;