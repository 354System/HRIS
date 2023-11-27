import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import WikiDocumentBodyAdmin from "../../component/admin/wiki document/WikiDocumentBodyAdmin";
import WikiDocumentHeaderAdmin from "../../component/admin/wiki document/WikiDocumentHeaderAdmin";
const WikiDocumentAdmin = () => {
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu />
            <Navbar />
            <div className="p-7 mt-28 pl-28 w-full flex flex-col">
                <WikiDocumentHeaderAdmin />
                <WikiDocumentBodyAdmin />
            </div>            
        </div>
    )
}
export default WikiDocumentAdmin;