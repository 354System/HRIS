import PurchaseInquiryLetterBox from "../component/action/purchaseInquryLetterBox"
import RepairInquryLetterBox from "../component/action/repairInquryLetter"
import ApprovePurchaseBoxUser from "../component/inquiry info/ApprovePurchaseInquiryLetter"
import ApproveRepairBoxUser from "../component/inquiry info/ApproveRepairDeviceBox"
import { Tooltip } from "react-tooltip"
import WaitingPurchaseInquiryBoxUser from "../component/inquiry info/WaitingPurchaseInquiry"
import WaitingRepairInquiryBoxUser from "../component/inquiry info/WaitingRepairBox"
import RejectPurchaseInquiryBoxUser from "../component/inquiry info/RejectPurchaseBox"
import RejectRepairInquiryBoxUser from "../component/inquiry info/RejectRepairBox"

const InquiryLetterInfo = ({ inquiryData, refetchInquiryData }) => {
    return (
        <div className="w-full h-full flex">
            {/* laptop */}
            <div className="w-full h-full flex flex-col gap-6 hp:hidden">
                <div className="flex h-1/2 gap-8">
                    <div data-tooltip-id="purchase">
                        <PurchaseInquiryLetterBox refetchInquiryData={refetchInquiryData} />
                        <Tooltip id="purchase" content="Create Purchase Request" place='top' offset={-10} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                    </div>
                    <div>
                        <ApprovePurchaseBoxUser inquiryData={inquiryData} />
                    </div>
                    <div>
                        <WaitingPurchaseInquiryBoxUser inquiryData={inquiryData} />
                    </div>
                    <div>
                        <RejectPurchaseInquiryBoxUser inquiryData={inquiryData} />
                    </div>
                </div>
                <div className="flex h-1/2 gap-8">
                    <div data-tooltip-id="repair">
                        <RepairInquryLetterBox refetchInquiryData={refetchInquiryData} />
                        <Tooltip id="repair" content="Create Repair Request" place='top' offset={-10} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                    </div>
                    <div>
                        <ApproveRepairBoxUser inquiryData={inquiryData} />
                    </div>
                    <div>
                        <WaitingRepairInquiryBoxUser inquiryData={inquiryData} />
                    </div>
                    <div>
                        <RejectRepairInquiryBoxUser inquiryData={inquiryData} />
                    </div>
                </div>
            </div>
            {/* hp */}
            <div className="w-full h-full flex flex-col gap-4">
                <div className="flex h-1/4 gap-4 laptop:hidden">
                    <PurchaseInquiryLetterBox refetchInquiryData={refetchInquiryData} />
                </div>
                <div className="flex h-1/4 laptop:hidden">
                    <RepairInquryLetterBox refetchInquiryData={refetchInquiryData} />
                </div>
                <div className="flex h-1/6 gap-3 laptop:hidden">
                    <ApprovePurchaseBoxUser refetchInquiryData={refetchInquiryData} inquiryData={inquiryData} />
                    <ApproveRepairBoxUser refetchInquiryData={refetchInquiryData} inquiryData={inquiryData} />
                </div>
                <div className="flex h-1/6 gap-3 laptop:hidden">
                    <WaitingPurchaseInquiryBoxUser refetchInquiryData={refetchInquiryData} inquiryData={inquiryData} />
                    <WaitingRepairInquiryBoxUser refetchInquiryData={refetchInquiryData} inquiryData={inquiryData} />
                </div>
                <div className="flex h-1/6 gap-3 laptop:hidden">
                    <RejectPurchaseInquiryBoxUser refetchInquiryData={refetchInquiryData} inquiryData={inquiryData} />
                    <RejectRepairInquiryBoxUser refetchInquiryData={refetchInquiryData} inquiryData={inquiryData} />
                </div>
            </div>
        </div>
    )
}
export default InquiryLetterInfo;