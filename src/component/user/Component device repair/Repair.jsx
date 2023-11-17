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

const Repair = () => {
    return (
        <div className="w-full min-h-screen flex absolute bg-gray-200">
            <div className="p-8">
                <SidebarmenuUser />
            </div>
            <div className="w-full p-8">
                <NavbarUser title="Device Repair" />
                <div className="w-full mb-10">
                    <div className="w-full  flex  gap-6">
                        <div className="w-full flex flex-col gap-8">
                            <div className="flex h-1/2 gap-4">
                                <RepairDeviceBox />
                                <ApproveDeviceBox/>
                                <WaitingDeviceBox/>
                                <RejectDeviceBox/>
                            </div>
                            <div className="flex h-1/2 items-end gap-4">
                                <PurchaseOfGoodsBox/>
                                <ApproveItemBox/>
                                <WaitingItemBox/>
                                <RejectItemBox/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Repair;