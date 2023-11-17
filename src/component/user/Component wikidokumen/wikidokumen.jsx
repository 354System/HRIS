import NavbarUser from "../Component dashboard/Navbar";
import SidebarmenuUser from "../Component dashboard/Sidebarmenu";
import DataDokumen from "./component/dataDokumen";


const WikiDokumen = () => {
    
    return (
        <div className="w-full min-h-screen flex absolute bg-gray-200">
            <div className="p-8">
                <SidebarmenuUser />
            </div>
            <div className="w-full p-8">
                <NavbarUser title="Document" />
                <div>
                    <DataDokumen />
                </div>
            </div>
        </div>
    )
}

export default WikiDokumen;