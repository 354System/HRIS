import { format } from "date-fns"
import { usePermissionCurrentUser } from "../../../../api/fetchDataCurrentUser/useFetchPermission"

const PermissionTableUser = ({ PermissionData }) => {
    return (
        <table className="w-full text-center">
            <thead>
                <tr className="border-b-4 border-t-2 text-grey">
                    <th className="p-4">Date</th>
                    <th className="text-center">Status</th>
                    <th className="">Start Date</th>
                    <th className="">End Date</th>
                    <th className="">Description</th>
                </tr>
            </thead>
            <tbody>
                {PermissionData ? PermissionData?.map((data, index) => (
                    <tr key={index} className="border-b font-semibold">
                        <td className="text-primary p-4 max-w-[90px]">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
                        <td className="text-primary">{data.izin}</td>
                        <td className="text-purple ">{format(new Date(data.fromdate), 'dd-MM-yyyy')}</td>
                        <td className="text-purple">{format(new Date(data.untildate), 'dd-MM-yyyy')}</td>
                        <td className="text-primary">{data.description}</td>
                    </tr>
                )) : null}
            </tbody>
        </table>
    )
}
export default PermissionTableUser