import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";



const TablePurchase = () => {

    function approvalStatus(approval) {
        if (approval === 'Approved') {
            return <td className="pl-2"><span className="text-white bg-green-500 p-2">Approved</span></td>
        } else if (approval === 'Rejected') {
            return <td className="pl-2"><span className="text-white bg-red-500 p-2">Rejected</span></td>
        } else {
            return <td className="pl-2"><span className="text-white bg-yellow p-2 rounded-lg">Wait For Response</span></td>
        }
    }

    const [data, setData] = useState([]);
    const [id, setId] = useState('');

    const Purchase = data?.filter(item => item.category === 'Purchase');


    useEffect(() => {
        // Fetch data from backend when the component mounts
        fetch(`https://fzsxpv5p-3000.asse.devtunnels.ms/form/by/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
        return formattedDate;
    };

    return (
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
                    {Purchase.map(item => (
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
    )
}
export default TablePurchase;