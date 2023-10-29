import React from "react";

const DeleteUser = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-full">
      <div className="absolute  top-1/2 transform -translate-y-1/2 bg-white p-4 w-[430px] h-[200px] rounded-lg flex flex-col">
        <h1 className="text-center text-black font-semibold">Apakah Anda Yakin Untuk Menghapus Akun?</h1>
        <div className="flex mt-20 px-10 gap-x-20 items-center justify-center">
            <button className="bg-[#D91A1A] w-[100px] h-[40px] text-center text-white font-semibold">No</button>
            <button  className="bg-[#57C125] w-[100px] h-[40px] text-center text-white font-semibold">Yes</button>
        </div>
      </div>

    </div>
  );
};

export default DeleteUser;
