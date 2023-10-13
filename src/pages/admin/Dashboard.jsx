import { Navbar } from "../../component/Navbar"
import { Sidebarmenu } from "../../component/Sidebarmenu"
import { LateArrivalBox } from "../../component/admin/dashboard/container info/LateArrivalBox"
import { OnTimeBox } from "../../component/admin/dashboard/container info/OnTimeBox"
import { RealtimeInsightBox } from "../../component/admin/dashboard/container info/RealtimeBox"
import { TotalEmployedBox } from "../../component/admin/dashboard/container info/TotalEmployeBox"
import { EarlyDepartureBox } from "../../component/admin/dashboard/container info/EarlyDepartureBox"
import { AbsentBox } from "../../component/admin/dashboard/container info/AbsentBox"
import { TimeOffBox } from "../../component/admin/dashboard/container info/TimeOffBox"
import GrafikAbsensi from "../../component/admin/dashboard/container chart/ChartAbsensi"
// import { useState } from "react"
// import { DataAbsensi } from "../../mockdata/DataAbsensi"

export function Dashboard() {

    return (
        <div className="w-full min-h-screen flex bg-darkwhite">
            <div className="p-8">
                <Sidebarmenu />
            </div>
            <div className="w-full p-8">
                <Navbar />
                <div className="w-full mb-10">
                    {/* container info */}
                    <div className="w-full flex h-72 gap-10">
                        <RealtimeInsightBox />
                        <div className="flex flex-col gap-10">
                            <div className="flex h-1/2 gap-10">
                                <TotalEmployedBox />
                                <OnTimeBox />
                                <AbsentBox/>
                            </div>
                            <div className="flex h-1/2 items-end gap-10">
                                <LateArrivalBox />
                                <EarlyDepartureBox/>
                                <TimeOffBox/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <GrafikAbsensi/>
                </div>
            </div>
        </div>
    )
}