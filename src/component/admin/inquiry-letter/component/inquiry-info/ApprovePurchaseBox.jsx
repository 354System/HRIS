import { TbDeviceImacCheck } from "react-icons/tb"

const ApprovePurchaseBoxAdmin = () => {
    return (
        <div className="2xl:w-80 w-64 h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>62</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <TbDeviceImacCheck size={20} color="green" />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Approve</span>
            </div>
        </div>
    )
}
export default ApprovePurchaseBoxAdmin;