import React from "react";
import { Sidebarmenu } from "../../Sidebarmenu";
import { Navbar } from "../../Navbar";
import ApproveRepair from "./component/approve-repair";
import ApprovePurchaseOfGoodsBox from "./component/apporve-pembelian-barang";
import ApproveRepairBox from "./component/Approve-repair-box";
import ApproveBarangBox from "./component/Approve-barang-box";
import WaitingRepairBox from "./component/waiting-device-box";
import WaitingBarangBox from "./component/waiting-barang-box";
import RejectBarangBox from "./component/reject-barang-box";
import RejectRepairBox from "./component/reject-device-box";
import TableAdmin from "./component/tableadmin";

const SubmissionOfImprovements = () => {
    return (
        <div className="w-full min-h-screen flex absolute bg-gray-200">
            <div className="p-8">
                <Sidebarmenu />
            </div>
            <div className="w-full p-8">
                <Navbar title="Device Approve"/>
                <div className="w-full mb-10 mt-32">
                    <div className="w-full  flex  gap-6">
                        <div className="w-full flex flex-col gap-8 px-4">
                            <div className="flex h-1/2 gap-4">
                                <ApproveRepair />
                                <ApproveRepairBox />
                                <WaitingRepairBox />
                                <RejectRepairBox />
                            </div>
                            <div className="flex h-1/2 items-end gap-4">
                                <ApprovePurchaseOfGoodsBox />
                                <ApproveBarangBox />
                                <WaitingBarangBox />
                                <RejectBarangBox />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <TableAdmin />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionOfImprovements;