import { format } from "date-fns";
import { Spinner } from "@chakra-ui/react";
import { useCheckOut } from "../../../../api/attendance/useCheckout";
import { IoAlertCircleOutline } from "react-icons/io5";
import { successAlert } from "../../../../lib/sweetAlert";
import { Button, Flowbite } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";

const Checkout = ({ id, CheckOutPopUp, refetch }) => {

    const now = new Date();
    const Times = format(now, "HH:mm:ss");
    const date = format(now, "dd MMMM yyyy");

    const successText = ['Have a Nice Rest !', 'Be Careful On the Way !', 'Come Back Soon !'];

    const { mutate, isPending } = useCheckOut({
        id,
        onSuccess: (data) => {
            successAlert({ title: 'Checkout Success', text: `${successText[Math.floor(Math.random() * successText.length)]}` })
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
                    <Flowbite theme={{ theme: flowbiteTheme }}>
                        <Button
                            color="red"
                            onClick={() => CheckOutPopUp(false)}
                            className="w-1/4 h-10 rounded-lg text-center flex items-center justify-center active:scale-95"
                        >
                            No
                        </Button>
                        <Button
                            color="green"
                            onClick={handleCheckout}
                            disabled={isPending}
                            isProcessing={isPending}
                            processingSpinner={<Spinner size={"sm"} color="green" />}
                            className="w-1/4 h-10 rounded-lg flex items-center justify-center active:scale-95">
                            Yes
                        </Button>
                    </Flowbite>
                </div>
            </div>
        </div>
    );
};
export default Checkout;
