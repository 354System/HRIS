import { AiOutlineSearch } from "react-icons/ai";
import { Icon } from "@iconify/react";
import ExportDataUser from "../actions/exportDataUser";
import { TextInput } from "flowbite-react";

const HeaderDataUser = ({ addUserPopUp, searchUser, setSearchUser, dataUsers }) => {
    const handleAddUserPopUp = () => {
        addUserPopUp(true);
    }

    return (
        <div className="flex hp:flex-col-reverse mb-8 gap-4">
            <div className="w-full">
                <TextInput
                    type="text"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    id="base-input"
                    className="laptop:w-96 hp:w-full h-10"
                    placeholder="Quick Search..."
                    required
                />
            </div>
            <div className="laptop:ml-4 flex gap-3 w-full">
                <ExportDataUser dataUsers={dataUsers} />
                <button
                    onClick={handleAddUserPopUp}
                    className="bg-purple hover:bg-[#532160] transition duration-300 laptop:w-52 hp:w-full h-10 rounded-lg flex items-center justify-center"
                >
                    <Icon
                        icon="zondicons:add-solid"
                        width="24"
                        className="mr-2 text-white"
                    />
                    <span className="text-sm  text-white font-bold">Add User</span>
                </button>
            </div>
        </div>
    )
}
export default HeaderDataUser;