import React from "react";
import PaidLeave from "./Component Overview/Paid Leave";
import Permission from "./Component Overview/Permission";
import Approve from "./Component Overview/Approve";
import ApprovePermission from "./Component Overview/Approve-permission";
import Pending from "./Component Overview/Pending";
import PendingPermission from "./Component Overview/Pending-permission";
import Reject from "./Component Overview/Reject";
import RejectPermission from "./Component Overview/Reject permission";
import Sidebarmenu from "./Component Overview/Sidebarmenu";
import Navbar from "./Component dashboard/Navbar";
import Button from "./Component Overview/Button";
import TablePremission from "./Component Overview/table-premission";

const OverviewAdmin = () => {
  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      <div className="p-8">
        <Sidebarmenu />
      </div>
      <div className="w-full p-8">
        <Navbar />
        <div className="w-full mb-10">
          <div className="flex flex-col gap-8">
            <div className="flex h-1/2 gap-8">
              <PaidLeave />
              <Approve />
              <Pending />
              <Reject />
            </div>
            <div className="flex h-1/2 items-end gap-8">
              <Permission />
              <ApprovePermission />
              <PendingPermission />
              <RejectPermission />
            </div>
          </div>
        </div>
        <div>
          <Button/>
          <TablePremission/>
        </div>
      </div>
    </div>
  );
};

export default OverviewAdmin;
