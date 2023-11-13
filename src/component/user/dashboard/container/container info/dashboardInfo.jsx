import { usePresenceCurrentUser } from "../../../../../api/fetchDataCurrentUser/useFetchPresence"
import AbsenBoxUser from "../../component/info/AbsenBox"
import LateBoxUser from "../../component/info/LateBox"
import LeaveBoxUser from "../../component/info/LeaveBox"
import OnTimeBoxUser from "../../component/info/OneTimeBox"
import PermisionBoxUser from "../../component/info/PermissionBox"
import RealtimeInsightBoxUser from "../../component/info/RealtimeBox"
import WorkingDayThismonthBoxUser from "../../component/info/WorkingDayThismonthBox"

const DashboardInfoUser = () => {
    const { data: presence } = usePresenceCurrentUser();
    return (
        <div className="w-full h-full flex">
            <div className="w-72 h-full">
                <RealtimeInsightBoxUser />
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex h-1/2 gap-8">
                    <OnTimeBoxUser data={presence} />
                    <AbsenBoxUser />
                    <LeaveBoxUser />
                </div>
                <div className="flex h-1/2 gap-8">
                    <LateBoxUser data={presence} />
                    <WorkingDayThismonthBoxUser data={presence}/>
                    <PermisionBoxUser />
                </div>
            </div>
        </div>
    )
}
export default DashboardInfoUser;