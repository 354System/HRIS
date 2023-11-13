import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { AiFillExclamationCircle } from 'react-icons/ai'
import { useAuthInfo } from '../use context/useAuthInfo'
import { useLogin } from '../api/authToken/useLogin'
import { Spinner } from '@chakra-ui/react'
import { LoadingScreen } from '../component/loading screen/loadingScreen'
const Login = () => {

    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')

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

    const { mutate, isSuccess } = useLogin({
        onSuccess: async (data) => {
            localStorage.setItem('authToken', data.token);
            window.location.href = '/dashboard'
        },
        onError: (error) => {
            const errorMessage = error.response.data.message;
            console.log(error);
            setErrorMsg(errorMessage);
        }
    });

    const handleLoginSubmit = () => {
        const { email, password } = user;
        mutate({
            email,
            password,
        });
    };

    return (
        <div className={`w-full min-h-screen bg-quarternary font-sans '}`}>
            <div className="flex flex-col justify-center items-center mt-16 gap-5">
                <div className="flex flex-col gap-2">
                    <h2 className={`flex justify-center text-primary font-bold text-3xl tracking-tighter "}`}>Sign In & Drive</h2>
                    <span className="text-tertiary text-xs text-center">We will help you get ready today</span>
                </div>
                <div className="flex flex-col w-[450px] h-full rounded-xl">
                    <form className={`p-10 mb-10 rounded-xl bg-primary`} >
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-bold text-quarternary text-sm">Email Address</label>
                            <input
                                type="Email"
                                id="email"
                                value={user.email}
                                onChange={handleChangeText}
                                placeholder="name@gmail.com"
                                className="w-full h-[45px] border border-[#D8D8E4] rounded-[25px] bg-white text-primary text-xs font-semibold p-3 mt-2 placeholder:font-normal focus:bg-white focus:border-[3px]"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block font-bold text-quarternary text-sm">Password</label>
                            <input
                                type="Password"
                                id="password"
                                value={user.password}
                                onChange={handleChangeText}
                                placeholder="•••••••••••••"
                                className="w-full h-[45px] border border-[#D8D8E4] rounded-[25px] bg-white text-primary text-xs font-semibold p-3 mt-2 placeholder:text-xs placeholder:bottom-20 focus:bg-white focus:border-[3px]"
                                required
                            />
                        </div>
                        {errorMsg && <span className="flex items-center gap-1 bg-red-200 rounded-xl p-1 text-xs mb-2 text-red-600"><AiFillExclamationCircle size={15} />{errorMsg}</span>}
                        <div className="flex justify-end items-center mb-8">
                            <span className="text-xs text-tertiary underline">Forgot My Password</span>
                        </div>
                        <div className="mb-4">
                            <button type="button" onClick={handleLoginSubmit} className="block bg-white shadow shadow-black w-full h-[45px] text-black text-xs font-semibold rounded-[25px] hover:bg-black transition duration-150 delay-100 hover:delay-100">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login