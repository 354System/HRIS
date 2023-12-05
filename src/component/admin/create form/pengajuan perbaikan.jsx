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
import NavbarUser from "../../user/Component dashboard/Navbar";

const SubmissionOfImprovements = () => {
    return (
        <div className="w-full min-h-screen flex absolute bg-gray-200">
            <Sidebarmenu />
            <NavbarUser title="Device Approve" />
            <div className="w-full laptop:p-8 laptop:ml-12 hp:hidden">
                <div className="w-full mb-10 mt-32 hp:hidden">
                    <div className="w-full  flex  gap-6">
                        <div className="w-full  flex-col gap-8 px-4 laptop:flex hp:hidden">
                            <div className="flex h-1/2 laptop:gap-4">
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
                    <div className="mt-10 laptop:block hp:hidden">
                        <TableAdmin />
                    </div>
                </div>
            </div>
            {/* hp */}
            <div className="w-full h-full flex flex-col mt-4 hp:gap-3 laptop:hidden p-3">
                <div className="flex h-1/4 mt-24">
                    <ApproveRepair />
                </div>
                <div className="flex h-1/4 gap-2 ">
                    <ApprovePurchaseOfGoodsBox />
                </div>
                <div className="flex h-1/4 gap-2 ">
                    <ApproveRepairBox />
                    <ApproveBarangBox />
                </div>
                <div className="flex h-1/4 gap-2 ">
                    <WaitingRepairBox />
                    <WaitingBarangBox />
                </div>
                <div className="flex h-1/4 gap-2 ">
                    <RejectRepairBox />
                    <RejectBarangBox />
                </div>
                <div className="laptop:hidden">
                    <TableAdmin />
                </div>
            </div>
        </div>
    )
}

export default SubmissionOfImprovements;