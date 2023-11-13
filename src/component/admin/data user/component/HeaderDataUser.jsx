import { AiOutlineSearch } from "react-icons/ai";
import { Icon } from "@iconify/react";
import ExportDataUser from "../actions/exportDataUser";

const HeaderDataUser = ({ addUserPopUp, searchUser, setSearchUser, dataUsers }) => {
    const handleAddUserPopUp = () => {
        addUserPopUp(true);
    }

    return (
        <div className="flex mb-8">
            <div className="relative flex-1">
                <AiOutlineSearch
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 dark:text-gray-600"
                    size={20}
                />
                <input
                    type="text"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    id="base-input"
                    className="w-96 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
                    placeholder="Quick Search..."
                    required
                />
            </div>
            <ExportDataUser dataUsers={dataUsers}/>
            <div className="ml-4">
                <button
                    onClick={handleAddUserPopUp}
                    className="bg-purple hover:bg-[#532160] transition duration-300 w-[168px] h-[40px] rounded-lg flex items-center justify-center"
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