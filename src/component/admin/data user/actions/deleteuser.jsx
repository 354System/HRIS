import { Spinner } from "@chakra-ui/react";
import { useDeleteUser } from "../../../../api/user-crud/useDeleteUser";
import { IoAlertCircleOutline } from "react-icons/io5";

const DeleteUser = ({ userid, deleteuser, refetchDataUser }) => {

  //memanggil useMutation(deleteUser)
  const { mutate, isPending } = useDeleteUser({
    //handle useMutation(deleteUser) success
    onSuccess: () => {
      refetchDataUser();
      deleteuser(false);
    },
  })

  //handle delete submit
  const deleteItem = () => {
    mutate(userid)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-black/60">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-5 w-2/4 h-2/5 flex flex-col justify-center rounded-lg">
        <div className="flex flex-col justify-center items-center gap-2">
          <IoAlertCircleOutline size={80} className="text-red" />
          <h1 className="text-center text-xl text-[#2F2F2F] font-semibold">Are You Sure Want To Delete This User ?</h1>
        </div>
        <div className="flex justify-center items-center mt-4 gap-6">
          <button
            onClick={() => deleteuser(false)}
            className="bg-red w-32 h-10 rounded-lg text-center text-white font-semibold hover:bg-red-dark transition-colors duration-200 "
          >
            No
          </button>
          <button
            onClick={deleteItem}
            disabled={isPending}
            className="bg-green w-32 h-10 rounded-lg flex items-center justify-center text-white font-semibold hover:bg-green-dark transition-colors duration-200"
          >
            {isPending ? <Spinner size={"sm"} color="green" /> : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
