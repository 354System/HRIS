import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { AiFillExclamationCircle } from 'react-icons/ai'
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
            });
            if (response.ok) {
                const userResponse = await response.json();
                const token = userResponse.token;
                localStorage.setItem('authToken', token);
                navigate('/dashboard')
            } else {
                const error = await response.json();

                if (error.message === 'Invalid Email') {
                    setErrorMsg("Invalid Email");
                } else if (error.message === 'Invalid Password') {
                    setErrorMsg('Invalid Password');
                }
                else if (error.message[0] === 'password must be longer than or equal to 6 characters') {
                    setErrorMsg('Password harus lebih dari 6 karakter!');
                } else {
                    // Tangani kesalahan umum di sini
                    console.error('Terjadi kesalahan saat login:', error.message);
                    setErrorMsg('Terjadi kesalahan saat login.');
                }
            }
        } catch (error) {
            console.error(error);
            console.log('Terjadi kesalahan saat login ');
        }
    }

    return (
        <div className={`w-full min-h-screen bg-quarternary font-sans '}`}>
            <div className="flex flex-col justify-center items-center mt-16 gap-5">
                <div className="flex flex-col gap-2">
                    <h2 className={`flex justify-center text-primary font-bold text-3xl tracking-tighter "}`}>Sign In & Drive</h2>
                    <span className="text-tertiary text-xs text-center">We will help you get ready today</span>
                </div>
                <div className="flex flex-col w-[450px] h-full rounded-xl">
                    <form className={`p-10 mb-10 rounded-xl bg-primary`} onSubmit={handleLoginSubmit}>
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
                            <button type="submit" className="block bg-primary shadow shadow-black w-full h-[45px] text-white text-xs font-semibold rounded-[25px] hover:bg-black transition duration-150 delay-100 hover:delay-100">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login