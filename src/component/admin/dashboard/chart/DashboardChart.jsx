import ChartAbsensi from "./component/chart/ChartAbsensi"
import ChartDivisiWeekly from "./component/chart/ChartDivisiWeekly"

const DashboardChartAdmin = ({ data }) => {
    return (
        <div className="w-full h-full bg-white rounded-lg flex">
            <div className="w-[60%]">
                <ChartAbsensi data={data}/>
            </div>
            <div className="w-[40%] h-full">
                <ChartDivisiWeekly />
            </div>
        </div>
    )
}
export default DashboardChartAdmin;