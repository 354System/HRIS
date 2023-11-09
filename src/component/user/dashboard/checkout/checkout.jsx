import { format } from "date-fns";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useCheckOut } from "../../../../api/attendance/useCheckout";

const Checkout = ({ id, CheckOutPopUp, refetch }) => {

    const now = new Date();
    const Times = format(now, "HH:mm:ss");
    const date = format(now, "dd MMMM yyyy");

    const { mutate, isPending } = useCheckOut(id, {
        onSuccess: (data) => {
            console.log(data);
            refetch
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
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black/60">
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-8 w-1/3 h-1/3 flex flex-col justify-center rounded-lg">
                <div>
                    <h1 className="text-center text-[#2F2F2F] font-normal">{date}</h1>
                    <h1 className="text-center text-[#2F2F2F] font-normal">{Times}</h1>
                </div>
                <h1 className="text-center text-[#2F2F2F] font-normal">Checkout</h1>
                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={() => CheckOutPopUp(false)}
                        className="bg-red w-[100px] h-[40px] text-center text-white font-semibold hover:bg-red/50 mr-4"
                    >
                        No
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="bg-green w-[100px] h-[40px] text-center text-white font-semibold hover:bg-green/50"
                    >
                        {isPending ? <Spinner size={6} color="green" /> : "Yes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
