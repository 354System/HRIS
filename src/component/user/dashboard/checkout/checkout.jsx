import { format } from "date-fns";
import { Spinner } from "@chakra-ui/react";
import { useCheckOut } from "../../../../api/attendance/useCheckout";
import { IoAlertCircleOutline } from "react-icons/io5";
import { successAlert } from "../../../../lib/sweetAlert";

const Checkout = ({ id, CheckOutPopUp, refetch }) => {

    const now = new Date();
    const Times = format(now, "HH:mm:ss");
    const date = format(now, "dd MMMM yyyy");

    const { mutate, isPending } = useCheckOut({
        id,
        onSuccess: (data) => {
            successAlert({title: 'Checkout Success', text: 'be careful on the way !'})
            console.log(data);
            refetch()
            CheckOutPopUp(false)
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleCheckout = () => {
        // Lakukan operasi checkout sesuai kebutuhan Anda di sini
        mutate({
            checkout: now
        })
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen z-20 bg-black/60">
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-5 laptop:w-2/4 hp:w-5/6 laptop:h-2/5 hp:h-2/6 flex flex-col justify-center rounded-lg">
                <div className="flex justify-center">
                    <IoAlertCircleOutline size={80} className="text-yellow" />
                </div>
                <h1 className="text-center text-xl text-[#2F2F2F] font-semibold">Checkout Now?</h1>
                <h1 className="mt-1 text-center font-semibold">{Times} - {date}</h1>
                <div className="flex justify-center items-center mt-4 gap-6">
                    <button
                        onClick={() => CheckOutPopUp(false)}
                        className="bg-red w-32 h-10 rounded-lg text-center text-white font-semibold hover:bg-red-dark transition-colors duration-200 "
                    >
                        No
                    </button>
                    <button
                        onClick={handleCheckout}
                        disabled={isPending}
                        className="bg-green w-32 h-10 rounded-lg flex items-center justify-center text-white font-semibold hover:bg-green-dark transition-colors duration-200"
                    >
                        {isPending ? <Spinner size={"sm"} color="green" /> : "Yes"}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Checkout;
