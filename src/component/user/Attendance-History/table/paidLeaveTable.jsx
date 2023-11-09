import { format } from "date-fns";
import { useLeaveCurrentUser } from "../../../../api/fetchDataCurrentUser/useFetchLeave"

const PaidLeaveTable = () => {
    const { data: LeaveData } = useLeaveCurrentUser()
    return (
        <table className="w-full text-center">
            <thead>
                <tr className="border-b-4 border-t-2 text-grey">
                    <th className="p-4">Date</th>
                    <th className="text-center">
                        Status
                    </th>
                    <th className="">
                        from
                    </th>
                    <th className="">
                        until
                    </th>
                    <th className="">
                        description
                    </th>
                    <th className="">
                        action
                    </th>
                </tr>
            </thead>
            <tbody>
                {LeaveData ? LeaveData?.map((data, index) => (
                    <tr key={index} className="border-b font-semibold">
                        <td className="text-[#252C58] p-4 max-w-[90px]">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
                        <td className="text-[#A332C3] ">{format(new Date(data.fromdate), 'HH:mm')}</td>
                        <td className="text-[#A332C3]">{format(new Date(data.untildate), 'HH:mm')}</td>
                        <td className="text-[#252C58]">{data.description}</td>
                        <td className="text-[#252C58]"></td>
                    </tr>
                )) : null}
            </tbody>
        </table>
    )
}
export default PaidLeaveTable;