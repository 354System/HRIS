import { format } from "date-fns";
const PaidLeaveTable = ({ LeaveData }) => {
    function approvalStatus(approval) {
        if (approval === 'Approved') {
            return <td className="pl-2"><span className="text-white bg-green p-2">Approved</span></td>
        } else if (approval === 'DisApproved') {
            return <td className="pl-2"><span className="text-white bg-red p-2">Disapproved</span></td>
        } else {
            return <td className="pl-2"><span className="text-white bg-yellow p-2 rounded-lg">Wait For Response</span></td>
        }
    }
    return (
        <table className="w-full text-center">
            <thead>
                <tr className="border-b-4 border-t-2 text-grey">
                    <th className="p-4">Date</th>
                    <th className="">Start Date</th>
                    <th className="">End Date</th>
                    <th className="">Description</th>
                    <th className="">Status</th>
                </tr>
            </thead>
            <tbody>
                {LeaveData ? LeaveData?.map((data, index) => (
                    <tr key={index} className="border-b font-semibold">
                        <td className="text-primary p-4 max-w-[90px]">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
                        <td className="text-purple ">{format(new Date(data.fromdate), 'HH:mm')}</td>
                        <td className="text-purple">{format(new Date(data.untildate), 'HH:mm')}</td>
                        <td className="text-primary">{data.description}</td>
                        {approvalStatus(data.approval)}
                    </tr>
                )) : null}
            </tbody>
        </table>
    )
}
export default PaidLeaveTable;