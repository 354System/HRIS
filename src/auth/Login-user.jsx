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
        <div className="flex w-full h-screen">
            <div className="flex w-[70%] h-full bg-[#A332C3] items-center justify-center relative">
                <div className="absolute w-full h-screen bg-repeat">
                    <img src="src/assets/ssss 1.png" alt="" className="h-full" />
                </div>
                <div className="flex bg-white/50 p-16 w-[70%] h-[80%] relative rounded-lg border-4 border-white/40">
                    <div className="font-bold text-6xl text-white w-[80%] h-[40%] leading-tight">
                        <div>Very Good.</div>
                        <div>Works Are Waiting</div>
                        <div>For You</div>
                    </div>
                    <img src="src/assets/01 2.png" alt="" className="absolute w-[60%] right-20 bottom-0" />
                    <div className="absolute bottom-12 left-12">
                        <h1 className="text-white text-3xl font-semibold">Login Now</h1>
                    </div>
                </div>
            </div>
            <div className=" justify-evenly  p-10 flex flex-col w-[30%] h-full items-center">
                <div className="w-38 flex justify-center h-12">
                    <img src="src/assets/Thinkspedia Main Logo 1.png" alt="" />
                </div>
                <div className="flex flex-col text-xl  gap-y-6">
                    <h1 className="font-semibold">Nice to see you again</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-lg">Login</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={user.email}
                                    onChange={handleChangeText}
                                    className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[360px] h-[48px]"
                                />
                            </div>
                            <div className="mt-2 flex flex-col">
                                <label htmlFor="password" className="text-lg">Password</label>
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
                                        value={user.password}
                                        onChange={handleChangeText}
                                    />
                                    <Icon
                                        onClick={togglePasswordVisibility}
                                        icon={showPassword ? "ph:eye-slash" : "ph:eye"}
                                        width={20}
                                        className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
                                    />
                                </div>
                            </div>
                            <div >
                                <h1 className="text-[#A332C3] text-xs text-end cursor-pointer">Forgot Your Password?</h1>
                            </div>
                            <div>
                                <button className="bg-[#A332C3] w-[360px] h-[40px] rounded-lg text-white text-sm font-semibold">
                                    sign in
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-20">
                        <h1 className="text-[#666666] text-xs">© Thinkspedia 2023</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginUser