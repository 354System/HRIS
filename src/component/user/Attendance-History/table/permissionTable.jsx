import { format } from "date-fns"
import { usePermissionCurrentUser } from "../../../../api/fetchDataCurrentUser/useFetchPermission"

const PermissionTableUser = () => {
    const { data: PermissionData } = usePermissionCurrentUser()
    console.log(PermissionData);
    return (
        <table className="w-full text-center">
            <thead>
                <tr className="border-b-4 border-t-2 text-grey">
                    <th className="p-4 ">Date</th>
                    <th className="text-center">
                        Status
                    </th>
                    <th className="">
                        From
                    </th>
                    <th className="">
                        Until
                    </th>
                    <th className="">
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                {PermissionData ? PermissionData?.map((data, index) => (
                    <tr key={index} className="border-b font-semibold">
                        <td className="text-[#252C58] p-4 max-w-[90px]">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
                        <td className="bg-white">{data.status}</td>
                        <td className="text-[#A332C3] ">{format(new Date(data.fromdate), 'dd-MM-yyyy')}</td>
                        <td className="text-[#A332C3]">{format(new Date(data.untildate), 'dd-MM-yyyy')}</td>
                        <td className="text-[#252C58]">{data.description}</td>
                    </tr>
                )) : null}
            </tbody>
        </table>
    )
}
export default PermissionTableUser