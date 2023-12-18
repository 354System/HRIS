import { Tooltip } from "flowbite-react"
import TotalReqInquiryPurchaseBoxAdmin from "../component/inquiry-info/TotalRequestPurchase"
import TotalReqInquiryRepairBoxAdmin from "../component/inquiry-info/TotalRequestRepair"
import ApprovePurchaseBoxAdmin from "../component/inquiry-info/ApprovePurchaseBox"
import WaitingPurchaseBoxAdmin from "../component/inquiry-info/WaitingPurchaseBox"
import RejectPurchaseInquiryBoxAdmin from "../component/inquiry-info/RejectPurchaseBox"
import WaitingRepairBoxAdmin from "../component/inquiry-info/WaitingRepairBox"
import RejectRepairInquiryBoxAdmin from "../component/inquiry-info/RejectRepairBox"
import ApproveRepairBoxUser from "../../../user/inquiry letter/component/inquiry info/ApproveRepairDeviceBox"
import { useFetchAllInquiryLetter } from "../../../../api/fetchData/useFetchAllInquiryLetter"

const InquiryLetterInfoAdmin = () => {
    const { data: requestData, isLoading } = useFetchAllInquiryLetter()
    return (
        <div className="w-full h-full flex">
            {/* laptop */}
            <div className="w-full h-full flex flex-col gap-6 hp:hidden">
                <div className="flex h-1/2 gap-8">
                    <div data-tooltip-id="purchase">
                        <TotalReqInquiryPurchaseBoxAdmin />
                        <Tooltip id="purchase" content="Create Purchase Inquiry" place='top' offset={-10} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                    </div>
                    <div>
                        <ApprovePurchaseBoxAdmin />
                    </div>
                    <div>
                        <WaitingPurchaseBoxAdmin />
                    </div>
                    <div>
                        <RejectPurchaseInquiryBoxAdmin />
                    </div>
                </div>
                <div className="flex h-1/2 gap-8">
                    <div data-tooltip-id="repair">
                        <TotalReqInquiryRepairBoxAdmin />
                        <Tooltip id="repair" content="Create Repair Inquiry" place='top' offset={-10} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                    </div>
                    <div>
                        <ApprovePurchaseBoxAdmin />
                    </div>
                    <div>
                        <WaitingRepairBoxAdmin />
                    </div>
                    <div>
                        <RejectRepairInquiryBoxAdmin />
                    </div>
                </div>
            </div>
            {/* hp */}
            <div className="w-full h-full flex flex-col gap-4 laptop:hidden">
                <div className="flex h-1/4">
                    <TotalReqInquiryPurchaseBoxAdmin requestData={requestData?.form} />
                </div>
                <div className="flex h-1/4">
                    <TotalReqInquiryRepairBoxAdmin requestData={requestData?.form} />
                </div>
                <div className="flex h-1/6 gap-3 laptop:hidden">
                    <ApprovePurchaseBoxAdmin />
                    <ApproveRepairBoxUser />
                </div>
                <div className="flex h-1/6 gap-3 laptop:hidden">
                    <WaitingPurchaseBoxAdmin />
                    <WaitingRepairBoxAdmin />
                </div>
                <div className="flex h-1/6 gap-3 laptop:hidden">
                    <RejectPurchaseInquiryBoxAdmin />
                    <RejectRepairInquiryBoxAdmin />
                </div>
            </div>
        </div>
    )
}
export default InquiryLetterInfoAdmin;