import AOTableDashboard from "./component/table/AOtable"
import AOtableHeaderDashboard from "./component/table/AOtableHeader"

const HistoryDashboardAdmin = ({ data }) => {
    return (
        <div className="w-full bg-white p-5 rounded-lg ">
            <AOtableHeaderDashboard/>
            <AOTableDashboard data={data}/>
        </div>
    )
}
export default HistoryDashboardAdmin;