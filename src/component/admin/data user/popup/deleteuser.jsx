import { Spinner } from "@chakra-ui/react";
import { useDeleteUser } from "../../../../features/user/useDeleteUser";

const DeleteUser = ({ userid, deleteuser, refetchDataUser }) => {

  const { mutate, isPending } = useDeleteUser({
    onSuccess: () => {
      refetchDataUser();
      deleteuser(false);
    },
  })

  const deleteItem = () => {
    mutate(userid)
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex items-center justify-center z-20 bg-black/5 w-full h-full">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[430px] h-[200px] rounded-lg flex flex-col">
        <h1 className="text-center text-black font-semibold">Apakah Anda Yakin Untuk Menghapus Akun?</h1>
        <div className="flex mt-20 px-10 gap-x-20 items-center justify-center">
          <button onClick={() => deleteuser(false)} className="bg-[#D91A1A] w-[100px] h-[40px] text-center text-white font-semibold">No</button>
          <button onClick={deleteItem} className="flex items-center justify-center bg-[#57C125] w-[100px] h-[40px] text-center text-white font-semibold">{isPending ? <Spinner size={10}/> : "Yes"}</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
