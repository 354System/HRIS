import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useEditUser } from "../../../../api/user-crud/useEditUser";
import { Spinner } from "@chakra-ui/react";
import {FaUserEdit} from 'react-icons/fa'


const EditUser = ({ user, editUserPopUp, refetchDataUser }) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const sliceCountryCode = String(user.numberphone).slice(0, 2)
    const sliceNumberPhone = String(user.numberphone).slice(2)
    const [userData, setUserData] = useState({
        email: user.email,
        name: user.name,
        position: user.position,
        divisi: user.divisi,
        address: user.address,
        phone: sliceNumberPhone,
        countryCode: user.numberphone ? `+${sliceCountryCode}` : '+62',
    });

    const handleClosePopUp = () => {
        editUserPopUp(false)
    }

    const validateInput = () => {
        const { email, name, phone, position, divisi } = userData;
    
        if (!email || !name || !phone) {
          setErrorMsg("all fields must be filled in!");
          return;
        }
        if (!name) {
          setErrorMsg("Username is required!");
          return;
        }
        if (!email) {
          setErrorMsg("Email is required!");
          return;
        }
        if (!phone) {
          setErrorMsg("Phone Number is required!");
          return;
        }
        if (!position) {
          setErrorMsg("Phone Number is required!");
          return;
        }
        if (!divisi) {
          setErrorMsg("Phone Number is required!");
          return;
        }
        if (phone.length < 9) {
          setErrorMsg("Phone Number must be at least 10 number!");
          return;
        }
      }

    //memanggil useMutation(editUser)
    const { mutate, isPending } = useEditUser({
        //passing userId
        userId: user._id,
        //handle success
        onSuccess: () => {
            refetchDataUser();
            editUserPopUp(false);
        },
        //handle error
        onError: (error) => {
            const validate = validateInput();
            console.error(error);
            if (validate) {
                const errorMessage = error.response.data.message;
                setErrorMsg(errorMessage);
            };
        },
    })

    const handleInputChange = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        const { email, name, position, divisi, address, phone, countryCode } = userData;
        const numberphone = countryCode + phone;
        mutate(
            {
                email,
                name,
                divisi,
                position,
                address,
                numberphone,
            }
        );
    };

    const countryCodes = [
        { value: '+62', label: 'ID (+62)' },
        { value: '+60', label: 'MY (+60)' },
        { value: '+65', label: 'SG (+65)' },
        { value: '+66', label: 'TH (+66)' },
        { value: '+84', label: 'VN (+84)' },
        { value: '+63', label: 'PH (+63)' },
        { value: '+673', label: 'BN (+673)' },
        { value: '+855', label: 'KH (+855)' },
        { value: '+856', label: 'LA (+856)' },
        { value: '+95', label: 'MM (+95)' },
        { value: '+670', label: 'TL (+670)' },
    ];

    const handleCountrySelect = (value) => {
        setUserData((prevState) => ({
            ...prevState,
            countryCode: value,
        }))
        setShowDropdown(false);
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex items-center justify-center z-20 bg-black/5 w-full h-full">
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[650px] h-[500px] rounded-lg flex flex-col ">
                <div className="absolute right-0 top-0 -mr-2 -mt-2">
                    <button
                        onClick={handleClosePopUp}
                        className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
                        <Icon icon="ion:close" color="white" width="17.44" />
                    </button>
                </div>
                <div className=" flex items-center mb-5">
                    <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <FaUserEdit size={23} className="pl-1"/>
                    </div>
                    <div className="flex flex-col px-2">
                        <p className="font-semibold">Edit-User</p>
                    </div>
                </div>
                <form>
                    {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
                    <input
                        type="email"
                        id="email"
                        className="w-full p-3 mb-3 bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg"
                        placeholder="name@gmail.com"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        id="address"
                        className="w-full p-3 mb-3 bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg"
                        placeholder="Adress Here"
                        value={userData.address}
                        onChange={handleInputChange}
                    />
                    <div className="mb-2 flex w-full gap-2 relative items-center">
                        <h1 className="w-1/4 h-11  flex items-center justify-center gap-2 font-semibold text-base bg-[#ACACAC]/50 border border-gray-300 text-black rounded-lg cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                            <span>{countryCodes.find((country) => country.value === userData.countryCode).label}</span>
                            {showDropdown ? <Icon icon="majesticons:chevron-up-circle" className="mt-1" fontSize={20} /> : <Icon icon="majesticons:chevron-down-circle" fontSize={20} className="mt-1" />}
                        </h1>
                        {showDropdown && (
                            <div className="absolute z-10 mt-12 bg-grey-200 border border-gray-300 overflow-y-auto rounded-lg w-32 shadow-md">
                                <ul>
                                    {countryCodes.map((country) => (
                                        <li
                                            key={country.value}
                                            value={userData.countryCode}
                                            onClick={() => handleCountrySelect(country.value)}
                                            className={`cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 hover:delay-75 ${showDropdown ? 'animate-dropdown' : ''}`}
                                        >
                                            {country.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <input
                            type="number"
                            id="phone"
                            className="bg-[#ACACAC]/50 border w-full p-3 border-gray-300 text-black text-sm rounded-lg"
                            placeholder="Number Phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-3 mb-3 bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg"
                        placeholder="User"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        id="position"
                        className="w-full p-3 mb-3 bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg"
                        placeholder="Position"
                        value={userData.position}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        id="divisi"
                        className="w-full p-3 mb-4 bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg"
                        placeholder="Divisi"
                        value={userData.divisi}
                        onChange={handleInputChange}
                    />
                    <div className="text-end flex justify-end gap-x-8">
                        <h1
                            onClick={handleClosePopUp}
                            className="flex items-center font-semibold cursor-pointer text-gray-700 hover:underline underline-offset-2 hover:text-gray-800 transition duration-300"
                            >
                            Cancel
                        </h1>
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="bg-purple hover:bg-[#5c215c] transition-colors duration-300 text-white font-semibold p-3 rounded-lg">
                            {isPending ? <Spinner size={20} color="white" /> : "Edit User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser;