import React from "react";
import UserHistori from "./component Histori-User/User-Histori";
import SidebarmenuUser from "./Component dashboard/Sidebarmenu";
import NavbarUser from "./Component dashboard/Navbar";

const Attendance = () => {
  return (
    <div className="w-full min-h-screen flex bg-gray-200">
      <div className="p-8">
        <SidebarmenuUser />
      </div>
      <div className="w-full p-8">
        <NavbarUser title="Attendance  Histori"/>
        <UserHistori/>
      </div>
    </div>
  );
};
export default Attendance;
