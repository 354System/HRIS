import { useState } from "react";
import { Icon } from "@iconify/react";
import { Spinner } from "@chakra-ui/react";
import { useCreateUser } from "../../../features/user/useCreateUser";

const AddUserAdmin = ({ addUserPopUp, refetchDataUser }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    role: "",
    department: "",
    password: "",
    address: "",
    phone: "",
    countryCode: '+62',
  });

  const handleExit = () => {
    addUserPopUp(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //membuat user
  const { mutate, isPending } = useCreateUser({
    onSuccess: () => {
      refetchDataUser();
      addUserPopUp(false);
      userData.email = "";
      userData.name = "";
      userData.role = "";
      userData.department = "";
      userData.password = "";
      userData.address = "";
      userData.phone = "";
    },
  })

  //handle submit
  const handleSubmit = () => {
    const { email, name, role, department, password, address, phone, countryCode } = userData;
    const numberphone = countryCode + phone;
    mutate(
      {
        email,
        name,
        divisi: department,
        position: role,
        password,
        address,
        numberphone: numberphone,
      }
    );
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex items-center justify-center z-20 bg-black/5 w-full h-full">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[667px] h-[590px] rounded-lg flex flex-col ">
        <div className="flex justify-end">
          <button
            onClick={handleExit}
            className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center">
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
          <div className="mt-2 flex">
            <div>
              <label
                htmlFor="email"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute">
              </label>
            </div>
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
            <div>
              <label
                htmlFor="address"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute">
              </label>
            </div>
            <input
              type="text"
              id="address"
              className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Adress Here"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex w-full">
            <label
              htmlFor="phone"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
            ></label>
            <div className="flex gap-2 w-full">
              <select
                id="countryCode"
                value={userData.countryCode}
                className="bg-[#ACACAC]/50 border w-3/12 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
                required
              >
                <option value="+62">ID (+62)</option>
                <option value="+86">CN (+86)</option>
                <option value="+84">VN (+84)</option>
                <option value="+61">AU (+61)</option>
                <option value="+65">SG (+65)</option>
                <option value="+60">MY (+60)</option>
                <option value="+84">VN (+84)</option>
                <option value="+44">JP (+81)</option>
                <option value="+82">KR (+82)</option>
                <option value="+66">TH (+66)</option>
                <option value="+63">PH (+63)</option>
                <option value="+92">PK (+92)</option>
                <option value="+880">BD (+880)</option>
                <option value="+977">NP (+977)</option>
                <option value="+975">BT (+975)</option>
                <option value="+960">MV (+960)</option>
                <option value="+966">SA (+966)</option>
                <option value="+971">AE (+971)</option>
                <option value="+965">KW (+965)</option>
                <option value="+974">QA (+974)</option>
              </select>
              <input
                type="number"
                id="phone"
                className="bg-[#ACACAC]/50 border w-full p-3 border-gray-300 text-black text-sm rounded-lg"
                placeholder="Number Phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mt-2 flex">
            <div>
              <label
                htmlFor="name"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
              ></label>
            </div>
            <input
              type="text"
              id="name"
              className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="User"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex">
            <div>
              <label
                htmlFor="role"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
              ></label>
            </div>
            <input
              type="text"
              id="role"
              className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Role"
              value={userData.role}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex">
            <div>
              <label
                htmlFor="department"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
              ></label>
            </div>
            <input
              type="text"
              id="department"
              className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Department"
              value={userData.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex">
            <div className="relative w-full">
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
                onClick={togglePasswordVisibility}
                icon={showPassword ? "ph:eye-slash" : "ph:eye"}
                width={20}
                className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
              />
            </div>
          </div>
          <div className="text-end flex justify-end gap-x-8 mt-20">
            <h1
              onClick={handleExit}
              className="mt-[11px] font-semibold cursor-pointer"
            >
              Cancel
            </h1>
            <button
              onClick={handleSubmit}
              type="button"
              className="flex items-center justify-center bg-purple w-[155px] h-[46px] rounded-lg text-white font-semibold">
              {isPending ? <Spinner size={10} color="white" /> : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserAdmin;
