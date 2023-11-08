import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { AiFillExclamationCircle } from "react-icons/ai";

const LoginUser = () => {


    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChangeText = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const email = user.email;
        const password = user.password;
        try {
            const response = await fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            })
            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.token; // Mengambil token dari respons JSON

                // Simpan token ke dalam localStorage
                localStorage.setItem("token", token);

                console.log("Login berhasil. Token disimpan di localStorage.");

                if (responseData.role === 'Admin') {
                    // Jika rolenya admin, arahkan ke halaman admin
                    window.location.href = "/admin/dashboard"
                } else if (responseData.role === 'Public') {
                    // Jika rolenya user, arahkan ke halaman user
                    window.location.href = "/dashboard";
                } else {
                    // Tangani peran lain jika diperlukan
                }
            } else {
                const errorData = await response.json();

                if (errorData.message === 'Invalid Email') {
                    setErrorMsg("Invalid Email");
                } else if (errorData.message === 'Invalid Password') {
                    setErrorMsg('Invalid Password');
                } else if (errorData.message[0] === 'password must be longer than or equal to 6 characters') {
                    setErrorMsg('Password harus lebih dari 6 karakter!');
                } else {
                    // Tangani kesalahan umum di sini
                    console.error('Terjadi kesalahan saat login:', errorData.message);
                    setErrorMsg('Terjadi kesalahan saat login.');
                }
            }

        } catch (error) {
            console.error(error);
            console.log('Terjadi kesalahan saat login ');
        }
    }

    return (
        <div>
            <div className="relative">
                <div className="absolute top-0 right-0 bg-[#A332C3] w-[527px] h-[739px] flex flex-col text-center">
                    <p className="text-2xl font-semibold text-white mt-60">Login Here</p>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mt-4 relative">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 text-sm font-medium text-gray-900 dark:text-gray absolute"
                                ></label>
                            </div>
                            <input
                                type="Email"
                                id="email"
                                value={user.email}
                                onChange={handleChangeText}
                                className="bg-[#ACACAC]/50 border w-[242px] h-[36px] text-gray-900 text-sm pl-6 pr-4 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Please Input Your email"
                            />
                            <Icon
                                icon="solar:user-outline" width={16} height={16}
                                className="absolute left-36 top-1/2 transform -translate-y-1/2 text-white text-bold"
                            />
                        </div>
                        <div className="mt-2 flex">
                            <div className="relative ml-36 mt-4">
                                <label
                                    htmlFor="password"
                                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                                ></label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="bg-[#ACACAC]/50 border border-gray-300 w-[242px] h-[36px] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                    placeholder="•••••••••••••"
                                    value={user.password}
                                    onChange={handleChangeText}
                                />
                                <Icon
                                    onClick={togglePasswordVisibility}
                                    icon={showPassword ? "ph:eye-slash" : "ph:eye"}
                                    width={20}
                                    className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                                />
                            </div>
                        </div>
                        <div className="px-28">
                        <div className="w-[242px] mt-4 left-36 px-6">
                            {errorMsg && (
                                <span className="flex items-center gap-1 bg-red-200 rounded-xl p-1 text-xs text-red-600">
                                    <AiFillExclamationCircle size={15} />
                                    {errorMsg}
                                </span>
                            )}
                        </div>
                        </div>
                        <div className=" flex justify-center gap-x-8 mt-20">
                            <button
                                className="bg-[#F9BE2A] w-[155px] h-[46px] rounded-lg text-white font-semibold"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginUser