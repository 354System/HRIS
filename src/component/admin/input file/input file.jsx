import React from "react"
import { Sidebarmenu } from "../../Sidebarmenu";
import { Navbar } from "../../Navbar";



const InputFile = () => {
    return (
        <div className="w-full min-h-screen flex absolute bg-gray-200">
            <div className="p-8">
                <Sidebarmenu />
            </div>
            <div className="w-full p-8">
                <Navbar title="Device Repair" />
                <div className="w-full mb-10">
                </div>
            </div>
        </div>
    )
}

export default InputFile;