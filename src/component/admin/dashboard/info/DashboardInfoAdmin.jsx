import { useFetchAllPresence } from "../../../../api/fetchData/useFetchAllPresence"
import AbsentBoxAdmin from "./component/box/AbsentBox"
import EarlyDepartureBox from "./component/box/EarlyDepartureBox"
import LateArrivalBox from "./component/box/LateArrivalBox"
import OnTimeBoxAdmin from "./component/box/OnTimeBox"
import RealtimeBoxAdmin from "./component/box/RealtimeBox"
import TimeOffBox from "./component/box/TimeOffBox"
import TotalEmployedBox from "./component/box/TotalEmployeBox"

const DashboardInfoAdmin = () => {
    const { data: allPresence } = useFetchAllPresence();
    return (
        <div className="w-full h-full flex hp:flex-col laptop:gap-8">
            <div className="laptop:w-1/4 gap-6 hp:w-full justify-center items-center h-full">
                <RealtimeBoxAdmin />
            </div>
            {/* laptop */}
            <div className="flex flex-col gap-8 w-3/4 hp:hidden">
                <div className="w-full flex h-1/2 gap-8">
                    <TotalEmployedBox />
                    <OnTimeBoxAdmin data={allPresence} />
                    <AbsentBoxAdmin />
                </div>
                <div className="w-full flex h-1/2 gap-8 hp:hidden">
                    <LateArrivalBox data={allPresence} />
                    <EarlyDepartureBox />
                    <TimeOffBox />
                </div>
            </div>
            {/* hp */}
            <div className="w-full laptop:hidden flex flex-col mt-4 gap-2">
                <div className="w-full flex h-1/4 gap-2 mt-2">
                    <TotalEmployedBox />
                    <TimeOffBox />
                </div>
                <div className="w-full flex h-1/4 gap-2">
                    <OnTimeBoxAdmin data={allPresence}/>
                    <LateArrivalBox data={allPresence}/>
                </div>
                <div className="w-full flex max-h-1/4 gap-2">
                    <EarlyDepartureBox data={allPresence}/>
                    <AbsentBoxAdmin data={allPresence}/>
                </div>
            </div>
        </div>
    )
}
export default DashboardInfoAdmin;