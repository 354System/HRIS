
import { useState } from "react";
import ApproveTabel from "./paid leave/approvedLeaveTable";
import DisApprovedLeaveTable from "./paid leave/disApprovedLeaveTable";
import PendingLeaveTable from "./paid leave/pendingLeaveTable";

const TablePaidLeaveAdmin = ({ paidLeaveData, refetchDataPaidLeave, approve, disApprove, pending }) => {

  return (
    <>
      {approve ? <ApproveTabel paidLeaveData={paidLeaveData} approvePopUp={approve} refetchDataPaidLeave={refetchDataPaidLeave}/> : null}
      {disApprove ? <DisApprovedLeaveTable paidLeaveData={paidLeaveData} disApprovePopUp={disApprove} refetchDataPaidLeave={refetchDataPaidLeave} /> : null}
      {pending ? <PendingLeaveTable paidLeaveData={paidLeaveData} refetchDataPaidLeave={refetchDataPaidLeave} pendingPopUp={pending} /> : null}
    </>
  )
}
export default TablePaidLeaveAdmin;