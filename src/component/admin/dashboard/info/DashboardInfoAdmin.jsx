import AbsentBoxAdmin from "./component/box/AbsentBox"
import EarlyDepartureBox from "./component/box/EarlyDepartureBox"
import LateArrivalBox from "./component/box/LateArrivalBox"
import OnTimeBoxAdmin from "./component/box/OnTimeBox"
import RealtimeBoxAdmin from "./component/box/RealtimeBox"
import TimeOffBox from "./component/box/TimeOffBox"
import TotalEmployedBox from "./component/box/TotalEmployeBox"

const DashboardInfoAdmin = () => {
    return (
        <div className="w-full h-full flex bg-gray-200 gap-8">
            <div className="h-full">
                <RealtimeBoxAdmin />
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex h-1/2 gap-8">
                    <TotalEmployedBox />
                    <OnTimeBoxAdmin />
                    <AbsentBoxAdmin />
                </div>
                <div className="flex h-1/2 gap-8">
                    <LateArrivalBox />
                    <EarlyDepartureBox />
                    <TimeOffBox />
                </div>
            </div>
        </div>
    )
}
export default DashboardInfoAdmin;