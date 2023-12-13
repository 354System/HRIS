import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import AddWikiDocument from "./component/popup/addWikiDocument";
import { TextInput } from "flowbite-react";
const WikiDocumentHeaderAdmin = () => {
    const [addDocumentPopUp, setAddDocumentPopUp] = useState(false)
    return (
        <div className="w-full flex hp:flex-col-reverse items-center justify-between laptop:h-16 bg-white laptop:px-5 hp:p-5 rounded-t-lg hp:gap-4">
            <div className="w-full">
                <TextInput
                    type="text"
                    // value={searchUser}
                    // onChange={(e) => setSearchUser(e.target.value)}
                    id="base-input"
                    className="laptop:w-96 w-full h-10"
                    placeholder="Quick Search..."
                    required
                />
            </div>
            <div className="w-full flex justify-end">
                <button
                    onClick={() => setAddDocumentPopUp(true)} className="flex items-center justify-center w-36 h-10 gap-2 bg-purple hover:bg-purple-dark transition duration-300 rounded-lg"
                >
                    <MdAddCircleOutline size={25} color="white" />
                    <span className="text-sm text-white font-bold">Add Document</span>
                </button>
            </div>
            {addDocumentPopUp ? <AddWikiDocument setAddDocumentPopUp={setAddDocumentPopUp} /> : null}
        </div>
    )
}
export default WikiDocumentHeaderAdmin;