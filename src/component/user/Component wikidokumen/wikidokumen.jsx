import SidebarmenuUser from "../Component dashboard/Sidebarmenu";
import DataDokumen from "./component/dataDokumen";
import NavbarUser from "../Component dashboard/Navbar";



const WikiDokumen = () => {

    return (
        <div className="w-full min-h-screen flex absolute bg-gray-200">
            <div className="p-8 laptop:block hp:hidden">
                <SidebarmenuUser />
            </div>
            <div className="w-full mt-10 mr-8 ">
                <NavbarUser title="Wiki Document" />
                <div className=" ml-4 mt-20">
                    <DataDokumen />
                </div>
            </div>


        </div>
    )
}

export default WikiDokumen;