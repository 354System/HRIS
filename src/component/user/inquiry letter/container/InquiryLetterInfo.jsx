import PurchaseInquiryLetterBox from "../component/action/purchaseInquryLetterBox"
import RepairInquryLetterBox from "../component/action/repairInquryLetter"
import ApprovePurchaseBoxUser from "../component/inquiry info/ApprovePurchaseInquiryLetter"
import ApproveRepairBoxUser from "../component/inquiry info/ApproveRepairDeviceBox"
import { Tooltip } from "react-tooltip"
import WaitingPurchaseInquiryBoxUser from "../component/inquiry info/WaitingPurchaseInquiry"
import WaitingRepairInquiryBoxUser from "../component/inquiry info/WaitingRepairBox"
import RejectPurchaseInquiryBoxUser from "../component/inquiry info/RejectPurchaseBox"
import RejectRepairInquiryBoxUser from "../component/inquiry info/RejectRepairBox"

const InquiryLetterInfo = ({ dataInquiry, refetchInquiryData }) => {
    return (
        <div className="w-full h-full flex">
            <div className="w-full h-full flex flex-col gap-6">
                <div className="flex h-1/2 gap-8">
                    <div data-tooltip-id="purchase">
                        <PurchaseInquiryLetterBox refetchInquiryData={refetchInquiryData} />
                        <Tooltip id="purchase" content="Create Purchase Request" place='top' offset={-10} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                    </div>
                    <div>
                        <ApprovePurchaseBoxUser />
                    </div>
                    <div>
                        <WaitingPurchaseInquiryBoxUser />
                    </div>
                    <div>
                        <RejectPurchaseInquiryBoxUser />
                    </div>
                </div>
                <div className="flex h-1/2 gap-8">
                    <div data-tooltip-id="repair">
                        <RepairInquryLetterBox refetchInquiryData={refetchInquiryData} />
                        <Tooltip id="repair" content="Create Repair Request" place='top' offset={-10} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                    </div>
                    <div>
                        <ApproveRepairBoxUser />
                    </div>
                    <div>
                        <WaitingRepairInquiryBoxUser />
                    </div>
                    <div>
                        <RejectRepairInquiryBoxUser />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InquiryLetterInfo;