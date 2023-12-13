import React from "react";
import SidebarmenuUser from "../Component dashboard/Sidebarmenu";
import NavbarUser from "../Component dashboard/Navbar";
import RepairDeviceBox from "./component/Perbaikan Device";
import PurchaseOfGoodsBox from "./component/pembelian barang";
import ApproveDeviceBox from "./component/Approve-device";
import ApproveItemBox from "./component/Approve-barang";
import WaitingDeviceBox from "./component/waiting-device";
import WaitingItemBox from "./component/waiting-barang";
import RejectDeviceBox from "./component/reject-device";
import RejectItemBox from "./component/reject-barang";
import { useEffect, useState } from "react";
import TableRepair from "./component/table/tableRepair";
import Button from "./component/table/Button";

const Repair = () => {


    const [FormData, setFormData] = useState([]);

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
                fetch(`https://fzsxpv5p-3000.asse.devtunnels.ms/form/by/${id}`, {
                    method: 'GET',
                }).then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }).then(data => {
                    setFormData(data);
                })
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <div className="w-full min-h-screen flex absolute bg-gray-200">
            <div className="p-8">
                <SidebarmenuUser />
            </div>
            <div className="w-full ">
                <NavbarUser title="Device Repair" />
                <div className="w-full mb-10">
                    <div className="w-full  flex  gap-6 mt-32">
                        <div className="w-full flex flex-col gap-8">
                            <div className="flex h-1/2 gap-4">
                                <RepairDeviceBox dataForm={FormData}/>
                                <ApproveDeviceBox dataForm={FormData} />
                                <WaitingDeviceBox dataForm={FormData} />
                                <RejectDeviceBox dataForm={FormData} />
                            </div>
                            <div className="flex h-1/2 items-end gap-4">
                                <PurchaseOfGoodsBox />
                                <ApproveItemBox dataform={FormData}  />
                                <WaitingItemBox dataform={FormData}  />
                                <RejectItemBox dataform={FormData}  />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Button />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Repair;