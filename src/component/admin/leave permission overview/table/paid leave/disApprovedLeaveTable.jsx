import { Spinner } from "@chakra-ui/react";
import { format, intervalToDuration } from "date-fns";
const DisApprovedLeaveTable = ({ paidLeaveData }) => {
    //membuat workhours
    paidLeaveData?.forEach(paidLeaveData => {
        const fromDate = new Date(paidLeaveData?.fromdate);
        let untilDate = new Date(paidLeaveData?.untildate);
        untilDate.setDate(untilDate.getDate() + 1);

        const timeDifference = untilDate - fromDate;

        const durationObject = intervalToDuration({ start: 0, end: timeDifference });
        let formattedDuration;
        if (durationObject.months > 0) {
            formattedDuration = `${durationObject.months}m ${durationObject.days}d`;
        } else if (durationObject.years > 0) {
            formattedDuration = `${durationObject.years}y ${durationObject.months}m ${durationObject.days}d`;
        }
        else {
            formattedDuration = `${durationObject.days}d`;
        }

        paidLeaveData.totalDays = formattedDuration;
    })
    return (
        <table className="w-full bg-white">
            <thead>
                <tr className="border-b border-t text-grey">
                    <th className="text-left p-4">Employee</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Days</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {paidLeaveData ? paidLeaveData.filter((data) => data.approval === "Reject").map((data, index) => (
                    <tr className="border-b" key={index}>
                        <td className="text-primary text-left w-48 p-4">{data.user.name}</td>
                        <td className="text-grey text-center">{data.user.position}</td>
                        <td className="text-grey text-center">{data.user.divisi}</td>
                        <td className="text-purple text-center">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
                        <td className="text-purple text-center">{format(new Date(data.fromdate), 'dd-MM-yyyy')}</td>
                        <td className="text-purple text-center">{format(new Date(data.untildate), 'dd-MM-yyyy')}</td>
                        <td className="text-grey text-center">{data.totalDays}</td>
                        <td className="text-center"><span className="bg-red text-white p-2 font-semibold rounded text-xs">Disapprove</span></td>
                    </tr>
                )) : <Spinner />}
            </tbody>
        </table >
    )
}
export default DisApprovedLeaveTable