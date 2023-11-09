import AOTableDashboard from "./component/table/AOtable"
import AOtableHeaderDashboard from "./component/table/AOtableHeader"

const HistoryDashboardAdmin = () => {
    return (
        <div className="w-full bg-white p-5">
            <AOtableHeaderDashboard />
            <AOTableDashboard />
        </div>
    )
}
export default HistoryDashboardAdmin;