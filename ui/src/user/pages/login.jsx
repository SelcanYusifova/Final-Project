import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: "",
        pass: "",
    });
    const [bool, setBool] = useState(false)

    let navigate = useNavigate()
    const welcome = (e) => {
        e.preventDefault();
        setBool(true)
        if (!user.email.trim() && !user.pass.trim()) {
            toast.error('Məlumatları tam daxil edin!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        } else {
            fetch("http://localhost:3000/users")
                .then(res => res.json())
                .then(data => {
                    let founded = data.find(e => e.email === user.email);
                    if (founded && founded.pass == user.pass) {
                        toast.success('Hesabınıza xoş gəldiniz!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                        navigate("/")
                        setBool(false)
                    } else {
                        toast.error('Mail və ya şifrə yanlışdır!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    }
                })
        }

    };

    return (
        <div className="min-h-screen flex bg-white">

            <div
                className="hidden lg:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://static.zarahome.net/assets/public/7d07/fdf6/683344e29e9a/44aa83265c4b/index/index.jpg?ts=1726667724254&d=20260106')",
                }}
            />

            <div className="w-full lg:w-1/2 flex items-center">
                <form className="w-full max-w-[420px] mx-auto px-6" onSubmit={welcome}>

                    <h2 className="text-[20px] font-[600] tracking-wide mb-[48px]">
                        SIGN IN
                    </h2>


                    <div className="relative mb-[32px]">
                        <input
                            type="email"
                            id="email"
                            placeholder=" "
                            className="
                    peer w-full bg-transparent
                    border-b border-black
                    outline-none
                    py-[6px] text-[14px]
                    focus:border-b-2
                  "onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}

                        />
                        {bool && user.email.trim() == "" && <p className="text-[12px] text-[red] font-[500] mt-[6px]">Zəhmət olmasa emailinizi daxil edin!</p>
                        }
                        <label
                            htmlFor="email"
                            className="
                    absolute left-0 top-[6px]
                    text-[14px] font-[500]
                    transition-all duration-200
    
                    peer-placeholder-shown:top-[6px]
                    peer-placeholder-shown:text-[12px]
    
                    peer-focus:-top-[14px]
                    peer-focus:text-[10px]
    
                    peer-[:not(:placeholder-shown)]:-top-[14px]
                    peer-[:not(:placeholder-shown)]:text-[10px]
                  "
                        >
                            Email*
                        </label>
                    </div>

                    <div className="relative mb-[48px]">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder=" "
                            className="
                    peer w-full bg-transparent
                    border-b border-black
                    outline-none
                    py-[6px] pr-[32px] text-[14px]
                    focus:border-b-2
                  "onChange={(e) => setUser({ ...user, pass: e.target.value })}
                            value={user.pass}

                        />
                        {bool && user.pass.trim() == "" && <p className="text-[12px] text-[red] font-[500] mt-[6px]">Zəhmət olmasa şifrənizi daxil edin!</p>
                        }
                        <label
                            htmlFor="password"
                            className="
                    absolute left-0 top-[6px]
                    text-[14px] font-[500]
                    transition-all duration-200
    
                    peer-placeholder-shown:top-[6px]
                    peer-placeholder-shown:text-[12px]
    
                    peer-focus:-top-[14px]
                    peer-focus:text-[10px]
    
                    peer-[:not(:placeholder-shown)]:-top-[14px]
                    peer-[:not(:placeholder-shown)]:text-[10px]
                  "
                        >
                            Password*
                        </label>

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-[6px] text-black"
                        >
                            {showPassword ? <FiEyeOff className="text-[18px] cursor-pointer" /> : <FiEye className="text-[18px] cursor-pointer" />}
                        </button>
                    </div>

                    <button
                        className="
                  bg-black text-white
                  px-[48px] py-[12px]
                  text-[12px] font-[600]
                  tracking-widest
                  transition hover:bg-[#1E1E1E]
                  cursor-pointer
                "
                    >
                        GO
                    </button>

                    <p className="mt-[24px] text-[14px] font-[500] tracking-wide">
                        Don't you have account?{" "}
                        <Link
                            to="/register"
                            className="underline font-[500] hover:opacity-70"
                        >
                            Sign Up
                        </Link>
                    </p>

                </form>
            </div>

        </div>
    );
}

export default Login;
