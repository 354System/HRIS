import { useState } from "react";
import { Icon } from "@iconify/react";
import { Spinner } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useCreateUser } from "../../../../api/user-crud/useCreateUser";

const AddUserAdmin = ({ addUserPopUp, refetchDataUser }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    position: "",
    divisi: "",
    password: "",
    address: "",
    phone: "",
    countryCode: '+62',
  });

  const handleInputChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const validateInput = () => {
    const { email, password, name, phone, position, divisi } = userData;

    if (!email || !password || !name || !phone) {
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
    if (!password) {
      setErrorMsg("Password is required!");
      return;
    }
    if (!password.length < 7) {
      setErrorMsg("Password must be at least 6 characters!");
      return;
    }
    if (phone.length < 10) {
      setErrorMsg("Phone Number must be at least 10 number!");
      return;
    }
  }

  //membuat user
  const { mutate, isPending } = useCreateUser({
    onSuccess: () => {
      refetchDataUser();
      addUserPopUp(false);
      userData.email = "";
      userData.name = "";
      userData.position = "";
      userData.divisi = "";
      userData.password = "";
      userData.address = "";
      userData.phone = "";
    },
    onError: (error) => {
      const validate = validateInput();
      if (validate) {
        const errorMessage = error.response.data.message;
        setErrorMsg(errorMessage);
      }
    }
  })

  //handle submit
  const handleSubmit = () => {
    const { email, name, position, divisi, password, address, phone, countryCode } = userData;
    const numberphone = countryCode + phone;
    mutate(
      {
        email,
        name,
        divisi,
        position,
        password,
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
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 bg-black/5 w-full h-full">
      <div className="fixed top-1/2 transform -translate-y-1/2 bg-white p-4 w-1/2 h-4/5 rounded-lg flex flex-col justify-between">
        <div className="absolute top-0 right-0 -mr-2 -mt-2">
          <button
            onClick={() => addUserPopUp(false)}
            className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
            <Icon icon="ion:close" color="white" width="17.44" />
          </button>
        </div>
        <div className=" flex items-center">
          <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
            <Icon icon="mingcute:user-add-fill" />
          </div>
          <div className="flex flex-col px-2">
            <span className="font-semibold">Add-User</span>
          </div>
        </div>
        <form>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <div className="mt-2 flex">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            ></label>
            <input
              type="text"
              id="name"
              className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex">
            <label
              htmlFor="position"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            ></label>
            <input
              type="text"
              id="position"
              className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Position"
              value={userData.position}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex">
            <label
              htmlFor="divisi"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            ></label>
            <input
              type="text"
              id="divisi"
              className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Divisi"
              value={userData.divisi}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex">
            <label
              htmlFor="address"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute">
            </label>
            <input
              type="text"
              id="address"
              className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Adress Here"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex w-full relative">
            <div className="flex gap-2 w-full items-center max-h-10">
              <h1 className="w-1/4 h-10 flex items-center justify-center gap-2 font-semibold text-base bg-[#ACACAC]/50 border border-gray-300 text-black rounded-lg cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                <span>{countryCodes.find((country) => country.value === userData.countryCode).label}</span>
                {showDropdown ? <Icon icon="majesticons:chevron-up-circle" className="mt-1" fontSize={20} /> : <Icon icon="majesticons:chevron-down-circle" fontSize={20} className="mt-1" />}
              </h1>
              {showDropdown && (
                <div className="absolute z-10 mt-12 bg-grey-200 border border-gray-300 overflow-y-auto rounded-lg w-32 shadow-md">
                  <ul>
                    {countryCodes.map((country) => (
                      <li
                        key={country.value}
                        value={country.value}
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
                className="bg-[#ACACAC]/50 border w-full h-10 p-3 border-gray-300 text-black text-sm rounded-lg"
                placeholder="Number Phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mt-2 flex">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute">
            </label>
            <input
              type="email"
              id="email"
              className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex">
            <div className="relative w-full mb-5">
              <label
                htmlFor="password"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
              ></label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="•••••••••••••"
                value={userData.password}
                onChange={handleInputChange}
              />
              <Icon
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? "ph:eye-slash" : "ph:eye"}
                width={20}
                className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
              />
            </div>
          </div>
          <div className="text-end flex justify-end items-center gap-x-8 ">
            <span
              onClick={() => addUserPopUp(false)}
              className="flex items-center font-semibold cursor-pointer text-gray-700 hover:underline underline-offset-2 hover:text-gray-800 transition duration-300"
            >
              Cancel
            </span>

            <button
              onClick={handleSubmit}
              type="button"
              className="bg-purple hover:bg-[#5c215c] transition-colors duration-300 text-white font-semibold p-3 rounded-lg">
              {isPending ? <Spinner size={20} color="white" /> : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserAdmin;
