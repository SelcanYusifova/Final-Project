import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function Register() {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        pass: "",
    });
    const [bool, setBool] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setTheme(localStorage.getItem("theme") || "light");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const addUser = (e) => {
        e.preventDefault();
        setBool(true);
        if (user.firstname.trim() !== "" && user.lastname !== "" && user.email !== "" && user.pass !== "") {
            fetch("http://localhost:3000/users")
                .then(res => res.json())
                .then(data => {
                    const email = data.find(e => e.email === user.email);
                    if (email) {
                        toast.error('Bu email artıq mövcuddur!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: theme === "dark" ? "dark" : "light",
                            transition: Bounce,
                        });
                    } else {
                        fetch("http://localhost:3000/users", {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify(user),
                        });

                        setUser({
                            firstname: "",
                            lastname: "",
                            email: "",
                            pass: ""
                        });
                        toast.success('Qeydiyyat uğurla tamamlandı!', {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: theme === "dark" ? "dark" : "light",
                            transition: Bounce,
                        });
                        setTimeout(() => {
                            navigate("/login");
                        }, 1500);
                        setBool(false);
                    }
                });
        } else {
            toast.error('Məlumatları tam daxil edin!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme === "dark" ? "dark" : "light",
                transition: Bounce,
            });
        }
    };

    return (
        <div className={`min-h-screen flex transition-colors duration-300
            ${theme === "light" ? "bg-white" : "bg-black"}`}>

            <div
                className="hidden lg:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://static.zarahome.net/assets/public/7d07/fdf6/683344e29e9a/44aa83265c4b/index/index.jpg?ts=1726667724254&d=20260106')",
                }}
            />

            <div className="w-full lg:w-1/2 flex items-center">
                <form className="w-full max-w-[420px] mx-auto px-6" onSubmit={addUser}>

                    <h2 className={`text-[20px] font-[600] tracking-wide mb-[48px]
                        ${theme === "light" ? "text-black" : "text-white"}`}>
                        SIGN UP
                    </h2>

                    <div className="relative mb-[32px]">
                        <input
                            type="text"
                            id="firstname"
                            placeholder=" "
                            className={`peer w-full bg-transparent outline-none py-[6px] text-[14px]
                                border-b focus:border-b-2 transition-colors
                                ${theme === "light" 
                                    ? "border-black text-black" 
                                    : "border-white text-white"}`}
                            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                            value={user.firstname}
                        />
                        {bool && user.firstname.trim() === "" && 
                            <p className="text-[12px] text-[red] font-[500] mt-[6px]">
                                Zəhmət olmasa adınızı daxil edin!
                            </p>
                        }
                        <label
                            htmlFor="firstname"
                            className={`absolute left-0 top-[6px] text-[14px] font-[500]
                                transition-all duration-200
                                peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-[12px]
                                peer-focus:-top-[14px] peer-focus:text-[10px]
                                peer-[:not(:placeholder-shown)]:-top-[14px]
                                peer-[:not(:placeholder-shown)]:text-[10px]
                                ${theme === "light" ? "text-black" : "text-white"}`}>
                            First name*
                        </label>
                    </div>

                    <div className="relative mb-[32px]">
                        <input
                            type="text"
                            id="lastname"
                            placeholder=" "
                            className={`peer w-full bg-transparent outline-none py-[6px] text-[14px]
                                border-b focus:border-b-2 transition-colors
                                ${theme === "light" 
                                    ? "border-black text-black" 
                                    : "border-white text-white"}`}
                            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                            value={user.lastname}
                        />
                        {bool && user.lastname.trim() === "" && 
                            <p className="text-[12px] text-[red] font-[500] mt-[6px]">
                                Zəhmət olmasa soyadınızı daxil edin!
                            </p>
                        }
                        <label
                            htmlFor="lastname"
                            className={`absolute left-0 top-[6px] text-[14px] font-[500]
                                transition-all duration-200
                                peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-[12px]
                                peer-focus:-top-[14px] peer-focus:text-[10px]
                                peer-[:not(:placeholder-shown)]:-top-[14px]
                                peer-[:not(:placeholder-shown)]:text-[10px]
                                ${theme === "light" ? "text-black" : "text-white"}`}>
                            Last name*
                        </label>
                    </div>

                    <div className="relative mb-[32px]">
                        <input
                            type="email"
                            id="email"
                            placeholder=" "
                            className={`peer w-full bg-transparent outline-none py-[6px] text-[14px]
                                border-b focus:border-b-2 transition-colors
                                ${theme === "light" 
                                    ? "border-black text-black" 
                                    : "border-white text-white"}`}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                        />
                        {bool && user.email.trim() === "" && 
                            <p className="text-[12px] text-[red] font-[500] mt-[6px]">
                                Zəhmət olmasa emailinizi daxil edin!
                            </p>
                        }
                        <label
                            htmlFor="email"
                            className={`absolute left-0 top-[6px] text-[14px] font-[500]
                                transition-all duration-200
                                peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-[12px]
                                peer-focus:-top-[14px] peer-focus:text-[10px]
                                peer-[:not(:placeholder-shown)]:-top-[14px]
                                peer-[:not(:placeholder-shown)]:text-[10px]
                                ${theme === "light" ? "text-black" : "text-white"}`}>
                            Email*
                        </label>
                    </div>

                    <div className="relative mb-[48px]">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder=" "
                            className={`peer w-full bg-transparent outline-none py-[6px] pr-[32px] text-[14px]
                                border-b focus:border-b-2 transition-colors
                                ${theme === "light" 
                                    ? "border-black text-black" 
                                    : "border-white text-white"}`}
                            onChange={(e) => setUser({ ...user, pass: e.target.value })}
                            value={user.pass}
                        />
                        {bool && user.pass.trim() === "" && 
                            <p className="text-[12px] text-[red] font-[500] mt-[6px]">
                                Zəhmət olmasa şifrənizi daxil edin!
                            </p>
                        }
                        <label
                            htmlFor="password"
                            className={`absolute left-0 top-[6px] text-[14px] font-[500]
                                transition-all duration-200
                                peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-[12px]
                                peer-focus:-top-[14px] peer-focus:text-[10px]
                                peer-[:not(:placeholder-shown)]:-top-[14px]
                                peer-[:not(:placeholder-shown)]:text-[10px]
                                ${theme === "light" ? "text-black" : "text-white"}`}>
                            Password*
                        </label>

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-0 top-[6px]
                                ${theme === "light" ? "text-black" : "text-white"}`}>
                            {showPassword ? 
                                <FiEyeOff className="text-[18px] cursor-pointer" /> : 
                                <FiEye className="text-[18px] cursor-pointer" />}
                        </button>
                    </div>

                    <button
                        className={`w-full px-[48px] py-[12px] text-[12px] font-[600]
                            tracking-widest transition cursor-pointer
                            ${theme === "light" 
                                ? "bg-black text-white hover:bg-[#1E1E1E]" 
                                : "bg-white text-black hover:bg-gray-200"}`}>
                        GO
                    </button>

                    <div className="flex justify-between">
                        <p className={`mt-[24px] text-[14px] font-[500] tracking-wide
                            ${theme === "light" ? "text-black" : "text-white"}`}>
                            Have you already account?{" "}
                            <Link
                                to="/login"
                                className="underline font-[500] hover:opacity-70">
                                Sign In
                            </Link>
                        </p>
                        <p className={`mt-[24px] text-[14px] font-[500] tracking-wide
                            ${theme === "light" ? "text-black" : "text-white"}`}>
                            <Link
                                to="/"
                                className="underline font-[500] hover:opacity-70">
                                Guest
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;