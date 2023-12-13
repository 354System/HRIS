import React, { useEffect, useState } from "react";
import { useLogin } from "../api/authToken/useLogin";
import { Spinner } from "@chakra-ui/react";
import { Button, Flowbite, Label, TextInput } from "flowbite-react";
import { flowbiteTheme } from "../lib/flowbiteTheme";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [color, setColor] = useState({
        email: 'gray',
        password: 'gray'
    })
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "Very Good \n Works Are Waiting For You",
        "Thinks The \n Power Is On Your Side",
    ];
    const images = ["01 2.png", "01 1.png"]; // Ganti dengan nama file yang sesuai

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000); // Ganti dengan durasi yang diinginkan (dalam milidetik)

        return () => clearInterval(intervalId);
    }, []);

    const lines = texts[textIndex].split('\n');

    //function untuk mencari field yang kosong
    const findFirstEmptyField = () => {
        const fields = ['email', 'password'];
        for (const field of fields) {
            if (!user[field]) {
                return field;
            }
        }
        return null;
    };

    const validateInput = () => {
        const { email, password } = user;
        const missingFields = [];

        if (!email) {
            missingFields.push('email');
        }
        if (!password) {
            missingFields.push('Password');
        }
        if (missingFields.length > 0) {
            const errorMessage = `${missingFields.join(', ')} ${missingFields.length > 1 ? 'are' : 'is'} Required !`;
            setErrorMsg(errorMessage);
            setColor({
                email: missingFields.includes('email') ? 'failure' : 'gray',
                password: missingFields.includes('password') ? 'failure' : 'gray',
            });
            return false;
        } else {
            setErrorMsg('');
            setColor({
                email: 'gray',
                password: 'gray',
            });
            return true;
        }
    }

    const handleChangeText = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const { mutate, isPending } = useLogin({
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

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        validateInput();
        const { email, password } = user;
        if (validateInput()) {
            mutate({
                email,
                password,
            });
        } else {
            const firstEmptyField = findFirstEmptyField();
            const inputElement = document.getElementById(firstEmptyField);
            inputElement.focus();
            inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setColor((prevState) => ({
                ...prevState,
                email: !email ? 'failure' : 'gray',
                password: !password ? 'failure' : 'gray',
            }))
        }
    };

    return (
        <div className="flex w-full h-screen">
            {/* hp-hidden */}
            <div className="hp:hidden flex items-center justify-center relative w-[70%] h-full bg-purple">
                <div className="absolute w-full h-screen bg-repeat">
                    <img src="src/assets/ssss 1.png" alt="" className="h-full" />
                </div>
                <div className="flex flex-col justify-between bg-white/50 p-16 laptop:w-[70%] laptop:h-[80%] relative rounded-lg border-2 border-white/40">
                    <div className="font-bold laptop:text-5xl text-white laptop:w-[80%] laptop:h-[40%] leading-tight">
                        {lines.map((line, index) => (
                            <div key={index}>
                                {line}
                            </div>
                        ))}
                    </div>
                    <img
                        src={`src/assets/${images[textIndex]}`}
                        alt=""
                        className="laptop:absolute laptop:w-[60%] laptop:right-8 laptop:bottom-0 hp:hidden laptop:block transition-all duration-1000 ease-in-out"
                    />
                    <div>
                        <h1 className="text-white text-xl font-semibold">Login Now</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-col laptop:justify-between laptop:w-[30%] laptop:h-full hp:w-full hp:h-full hp:py-20 p-8 laptop:bg-white hp:bg-purple/10">
                <div className="flex justify-center h-10 laptop:w-[70%] hp:w-full">
                    <img src="src/assets/logo terbaru.png" alt="" className="laptop:w-full hp:w-2/3" />
                </div>
                <div className="flex flex-col text-xl gap-2 w-full hp:py-20">
                    <h1 className="font-semibold mb-3">Nice to see you again</h1>
                    <form onSubmit={handleLoginSubmit} className="w-full">
                        <Flowbite theme={{ theme: flowbiteTheme }}>
                            <div className="flex flex-col mb-3">
                                <Label htmlFor="email" value="Email" className="pl-5 mb-1 hp:text-black" />
                                <TextInput
                                    type="email"
                                    id="email"
                                    value={user.email}
                                    onChange={handleChangeText}
                                    color={color.email}
                                    sizing={'lg'}
                                    className="w-full"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="relative w-full mb-5">
                                <Label htmlFor="password" value="Password" className="pl-5 mb-1 hp:text-black" />
                                <TextInput
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={user.password}
                                    onChange={handleChangeText}
                                    color={color.password}
                                    sizing={'lg'}
                                    className="w-full"
                                    placeholder="Enter Password"
                                    required
                                />
                                <div className="w-5 h-5 absolute bottom-3 right-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</div>
                            </div>
                            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
                            <div className="mb-5 flex justify-end">
                                <h1 className="text-purple text-xs hover:underline hover:font-semibold cursor-pointer">Forgot Your Password?</h1>
                            </div>
                            <div>
                                <Button type="submit" disabled={isPending} color="purple" isProcessing={isPending} processingSpinner={<Spinner size={"sm"} color="white" />} className="w-full h-12 active:scale-95 transition-all duration-100">
                                    Sign In
                                </Button>
                            </div>
                        </Flowbite>
                    </form>
                </div>
                <div className="">
                    <h1 className="text-[#666666] text-xs">© Thinkspedia 2023</h1>
                </div>
            </div>
        </div>
    )
}

export default Login