import { AiOutlineSearch } from "react-icons/ai";
import { Icon } from "@iconify/react";

const HeaderDataUser = ({ addUserPopUp, searchUser, setSearchUser }) => {

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10 pr-4 py-2 block w-[470px] h-[40px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Quick Search..."
                    required
                />
            </div>
            <div className="ml-4">
                <button className="bg-[#D5D9DD] w-[133px] h-[40px] rounded-lg flex items-center justify-center  gap-x-2">
                    <p className="text-sm text-grey">Role</p>
                    <Icon
                        icon="bxs:up-arrow"
                        color="#20285a"
                        width="5.88"
                        rotate={2}
                        className=""
                    />
                </button>
            </div>
            <div className="ml-4">
                <button className="bg-[#D5D9DD] w-[133px] h-[40px] rounded-lg flex items-center justify-center gap-x-2">
                    <p className="text-sm text-grey">Departement</p>
                    <Icon
                        icon="bxs:up-arrow"
                        color="#20285a"
                        width="5.88"
                        rotate={2}
                        className=""
                    />
                </button>
            </div>
            <div className="ml-4">
                <button
                    onClick={handleAddUserPopUp}
                    className="bg-[purple] w-[168px] h-[40px] rounded-lg flex items-center justify-center"
                >
                    <Icon
                        icon="zondicons:add-solid"
                        width="24"
                        className="mr-2 text-[#FFFFFF]"
                    />
                    <span className="text-sm  text-white font-bold">Add User</span>

                </button>
            </div>
        </div>
    )
}
export default HeaderDataUser;