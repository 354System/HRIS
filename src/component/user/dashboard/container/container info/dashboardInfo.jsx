import AbsenBoxUser from "../../component/info/AbsenBox"
import LateBoxUser from "../../component/info/LateBox"
import LeaveBoxUser from "../../component/info/LeaveBox"
import OnTimeBoxUser from "../../component/info/OneTimeBox"
import RealtimeInsightBoxUser from "../../component/info/RealtimeBox"
import WorkingDayThismonthBoxUser from "../../component/info/WorkingDayThismonthBox"
import LeaveAndPermissionButton from "../../component/info/LeaveandPermissionButton"
const DashboardInfoUser = ({ presence, paidLeave, refetchPresence }) => {
    return (
        <div className="w-full h-full flex hp:flex-col">
            <div className="laptop:w-72 gap-6 hp:w-full justify-center items-center h-full">
                <RealtimeInsightBoxUser data={presence} refetchPresence={refetchPresence} />
            </div>
            {/* laptop */}
            <div className="laptop:flex hp:hidden flex-col gap-6 ">
                <div className="flex h-1/2 gap-8">
                    <OnTimeBoxUser data={presence} />
                    <AbsenBoxUser data={presence} />
                    <LeaveBoxUser data={paidLeave} />
                </div>
                <div className="flex h-1/2 gap-8">
                    <LateBoxUser data={presence} />
                    <WorkingDayThismonthBoxUser data={presence} />
                    <LeaveAndPermissionButton />
                </div>
            </div>
            {/* hp */}
            <div className="laptop:hidden flex flex-col mt-4 gap-2">
                <div className="flex h-1/4 gap-2">
                    <LeaveAndPermissionButton />
                </div>
                <div className="flex h-1/4 gap-2 mt-2">
                    <OnTimeBoxUser data={presence} />
                    <AbsenBoxUser data={presence} />
                </div>
                <div className="flex h-1/4 gap-2">
                    <LateBoxUser data={presence} />
                    <LeaveBoxUser data={paidLeave} />
                </div>
                <div className="flex max-h-1/4 gap-2">
                    <WorkingDayThismonthBoxUser data={presence} />
                </div>
            </div>
        </div>
    )
}
export default DashboardInfoUser;