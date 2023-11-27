import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import AddWikiDocument from "./component/popup/addWikiDocument";
const WikiDocumentHeaderAdmin = () => {
    const [addDocumentPopUp, setAddDocumentPopUp] = useState(false)
    return (
        <div className="flex items-center justify-between h-16 bg-white px-5 rounded-t-lg">
            <div className="relative flex">
                <AiOutlineSearch
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 dark:text-gray-600"
                    size={20}
                />
                <input
                    type="text"
                    // value={searchUser}
                    // onChange={(e) => setSearchUser(e.target.value)}
                    id="base-input"
                    className="w-96 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
                    placeholder="Quick Search..."
                    required
                />
            </div>
            <div>
                <button
                    onClick={() => setAddDocumentPopUp(true)} className="flex items-center justify-center w-36 h-10 gap-2 bg-purple hover:bg-purple-dark transition duration-300 rounded-lg"
                >
                    <MdAddCircleOutline size={25} color="white"/>
                    <span className="text-sm text-white font-bold">Add Document</span>
                </button>
            </div>
            {addDocumentPopUp ? <AddWikiDocument setAddDocumentPopUp={setAddDocumentPopUp}/> : null}
        </div>
    )
}
export default WikiDocumentHeaderAdmin;